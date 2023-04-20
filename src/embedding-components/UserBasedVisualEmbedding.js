import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API, graphqlOperation } from "aws-amplify";
import { Flex } from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';
import * as queries from "../graphql/queries";
import * as QuickSightEmbedding from "amazon-quicksight-embedding-sdk";
import {Loading} from '../components'

async function getIdentityId () {   
    var session = await Auth.currentSession()
    var IdToken = await session.getIdToken()
    return IdToken  
}

export default function UserBasedVisualEmbedding(props) {
  const [url, setUrl] = useState("");
  const [embedSession, setEmbedSession] = useState();

  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getVisualEmbedUrl = async () => {

      const token = await getIdentityId();
      const res = await API.graphql(
        graphqlOperation(queries.userBasedVisualEmbedding, { openIdToken: JSON.stringify(token)}));
      console.log("graphql response: ", res);
      const http_response = JSON.parse(res.data.userBasedVisualEmbedding);
      return http_response;
    };

    setLoading(true);
    getVisualEmbedUrl().then(r => {
      setUrl(r.EmbedUrl.EmbedUrl)
      setLoading(false);
      console.log(url)
  })
  }, [user]);
  useEffect(() => {
    const embed = async () => {
      const embeddingContext = await QuickSightEmbedding.createEmbeddingContext();
      const { embedVisual } = embeddingContext;


      const containerDiv = document.getElementById("visual");
      
      const frameOptions = {
        url: url,
        container: containerDiv
      };

      const contentOptions = {

      }
      const embeddedVisualExperience = await embedVisual(frameOptions, contentOptions);
      return embeddedVisualExperience;
    };
    embed().then((r) => setEmbedSession(r));
  }, [user,url]);
  return (
    <Flex direction="row" padding="0px 50px 50px 50px" height = "100vh" minHeight="100vh">
        <Flex justifyContent="center" width = "100%" >
    {loading === false &&
    <div
              id="visual"
              style={{ width: "700px", height: "700px" }}

            ></div>}
    {loading === true &&
        <Loading type = "Visual for"></Loading>
    }
    </Flex></Flex>
  );
}

