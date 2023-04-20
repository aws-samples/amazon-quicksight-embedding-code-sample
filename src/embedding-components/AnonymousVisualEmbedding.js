import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API, graphqlOperation } from "aws-amplify";
import { Flex } from "@aws-amplify/ui-react";
import * as queries from "../graphql/queries";
import * as QuickSightEmbedding from "amazon-quicksight-embedding-sdk";
import {Loading} from '../components'


export default function AnonymousVisualEmbedding(props) {
  const [url, setUrl] = useState("");
  const [embedSession, setEmbedSession] = useState();

  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  
  useEffect(() => {
    const getVisualEmbedUrl = async () => {
      const res = await API.graphql(
        graphqlOperation(queries.anonymousVisualEmbedding, {
          tag_value: props.tagValue
        })
      );
      console.log("graphql response: ", res);
      const http_response = JSON.parse(res.data.anonymousVisualEmbedding);
      return http_response;
    };

    setLoading(true);
    getVisualEmbedUrl().then(r => {
      setUrl(r.embed_url.EmbedUrl)
      setLoading(false);
      console.log(url)
  })
  }, [user, props.tagValue]);

  useEffect(() => {
    const embed = async () => {
      const embeddingContext = await QuickSightEmbedding.createEmbeddingContext();
      const { embedVisual } = embeddingContext;


      const containerDiv = document.getElementById("visual");
      
      const frameOptions = {
        url: url,
        container: containerDiv,
        height: "100%",
        width: "100%"
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
    //INSERT EMBEDDING SESSION HERE
    <div
              id="visual"
              style={{ width: "700px", height: "700px"}}

            ></div>}
    {loading === true &&
        <Loading type = "Visual for"></Loading>
    }
    </Flex></Flex>
  );
}

