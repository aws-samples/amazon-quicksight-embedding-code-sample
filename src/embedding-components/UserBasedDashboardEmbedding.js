import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/UserContext'
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { Flex, SelectField, Divider, Alert } from "@aws-amplify/ui-react";
import { Loading } from '../components'
import * as QuickSightEmbedding from "amazon-quicksight-embedding-sdk";
import * as queries from '../graphql/queries';

export default function UserBasedEmbedding() {

  const [userBasedEmbedUrl, setUserBasedEmbedUrl] = useState("");
  const [embedSession, setEmbedSession] = useState("");
  const [dashboardList, setDashboardList] = useState([]);
  const [currentDashboardId, setCurrentDashboardId] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);


  async function getIdentityId() {
    var session = await Auth.currentSession()
    var IdToken = await session.getIdToken()
    return IdToken
  }


  useEffect(() => {

    const fetchDashboard = async () => {
      const token = await getIdentityId();
      const res = await API.graphql(
        graphqlOperation(queries.userBasedDashboardEmbedding, { openIdToken: JSON.stringify(token) }));
      const http_response = JSON.parse(res.data.userBasedDashboardEmbedding);
      console.log('graphql response: ', http_response);
      return http_response;
    }

    setLoading(true);
    fetchDashboard().then(r => {
      setUserBasedEmbedUrl(r.EmbedUrl.EmbedUrl);
      setDashboardList(r.DashboardList.Dashboards);
      setLoading(false);
    }).catch((error) => {
      setError(error.errors[0].message);
      setLoading(false);
    })

  }, [user])

  useEffect(() => {
    const embed = async () => {
      const embeddingContext = await QuickSightEmbedding.createEmbeddingContext();
      const { embedDashboard } = embeddingContext;
      const containerDiv = document.getElementById("dashboard");

      const frameOptions = {
        url: userBasedEmbedUrl,
        container: containerDiv,
        resizeHeightOnSizeChangedEvent: true
      };

      const contentOptions = {}
      const embeddedDashboardExperience = await embedDashboard(frameOptions, contentOptions);
      return embeddedDashboardExperience;
    };
    embed().then((r) => setEmbedSession(r));
  }, [user, userBasedEmbedUrl]);

  useEffect(() => {
    const selectDashboard = async () => {
      console.log("In selectDashboard func", currentDashboardId);
      const options = {};
      embedSession.navigateToDashboard(currentDashboardId, options);
    };
    selectDashboard()
  }, [user, embedSession, currentDashboardId]);

  return (
    <Flex direction="row" padding="0px 50px 50px 50px" height="100%" minHeight="100vh">
      <div width="350px">
        <SelectField size="small" width="250px" variation="quiet" placeholder="Select Dashboard" padding="10px 0px 0px 0px"
          onChange={(e) => setCurrentDashboardId(e.target.value)}>
          {dashboardList.map((dashboard) => <option value={dashboard.DashboardId}>{dashboard.Name}</option>)}
        </SelectField>
      </div>
      <Divider orientation="vertical" />
      <Flex justifyContent="center" width="100%" >
        {dashboardList.length !== 0 && loading === false &&
          <div
            id="dashboard"
            style={{ width: "100%", height: "100%" }}
          ></div>}
        {dashboardList.length === 0 && loading === false &&
          <Flex padding="25px">
            <Alert variation="info" isDismissible={true} hasIcon={true} heading="Alert" height="75px">
              There are currently no dashboards shared with you.
            </Alert>
          </Flex>}
        {loading === true &&
          <Loading type="Dashboards shared with"></Loading>}
      </Flex>
    </Flex>
  );
}


