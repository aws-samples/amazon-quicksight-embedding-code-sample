import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API, graphqlOperation } from "aws-amplify";
import { Flex, SelectField, Divider, } from "@aws-amplify/ui-react";
import * as queries from "../graphql/queries";
import * as QuickSightEmbedding from "amazon-quicksight-embedding-sdk";
import {Loading} from '../components'


export default function AnonymousDashboardEmbedding(props) {
  const [url, setUrl] = useState("");
  const [embedSession, setEmbedSession] = useState();

  const [currentDashboardId, setCurrentDashboardId] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [dashboardList,setDashboardList] = useState([]);

  
  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await API.graphql(
        graphqlOperation(queries.anonymousDashboardEmbedding, {
          tag_value: props.tagValue
        })
      );
      console.log("graphql response: ", res.data.anonymousDashboardEmbedding);
      const http_response = JSON.parse(res.data.anonymousDashboardEmbedding);
      return http_response;
    };

    setLoading(true);
    fetchDashboard().then(r => {
      setDashboardList(r.dashboard_list)
      setUrl(r.embed_url.EmbedUrl)
      setLoading(false);
  })
  }, [user, props.tagValue]);

  useEffect(() => {
    const embed = async () => {
      const embeddingContext = await QuickSightEmbedding.createEmbeddingContext();
      const { embedDashboard } = embeddingContext;

      const containerDiv = document.getElementById("dashboard");
      
      const frameOptions = {
        url: url,
        container: containerDiv,
        resizeHeightOnSizeChangedEvent: true
      };

      const contentOptions = {

      }
      const embeddedDashboardExperience = embedDashboard(frameOptions, contentOptions);
      return embeddedDashboardExperience;
    };
    embed().then((r) => setEmbedSession(r));
  }, [user,url]);


  useEffect(() => {
    const selectDashboard = async () => {
      console.log("In selectDashboard func", currentDashboardId);
      const options = {};
      embedSession.navigateToDashboard(currentDashboardId, options);

    };
    selectDashboard()
  }, [user,embedSession,currentDashboardId]);

  return (
    <Flex direction="row" padding="0px 50px 50px 50px" minHeight="100vh">
      <div width="350px">
        <SelectField
          size="small"
          width="250px"
          variation="quiet"
          placeholder="Select Dashboard"
          padding = "10px 0px 0px 0px"
          onChange={(e) => setCurrentDashboardId(e.target.value)}
        >
          {dashboardList.map((dashboard) => <option value={dashboard.DashboardId}>{dashboard.Name}</option>)}
        </SelectField>
      </div>
      <Divider orientation="vertical" />
      <Flex justifyContent="center" width = "100%">

      {loading === false &&
      <Flex
        id="dashboard"
        width = "100%"
      ></Flex>}
          {loading === true &&
              <Loading type = "Dashboard for"></Loading>
          }
          
          </Flex>
        </Flex>
  );
}
