import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API, graphqlOperation } from "aws-amplify";
import { Flex } from "@aws-amplify/ui-react";
import * as queries from "../graphql/queries";
import * as QuickSightEmbedding from "amazon-quicksight-embedding-sdk";
import {Loading} from '../components'


export default function AnonymousQEmbedding(props) {
  const [url, setUrl] = useState("");
  const [embedSession, setEmbedSession] = useState();

  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  
  useEffect(() => {
    const getQEmbedUrl = async () => {
      const res = await API.graphql(
        graphqlOperation(queries.anonymousQEmbedding, {
          tag_value: props.tagValue
        })
      );
      console.log("graphql response: ", res);
      const http_response = JSON.parse(res.data.anonymousQEmbedding);
      return http_response;
    };

    setLoading(true);
    getQEmbedUrl().then(r => {
      setUrl(r.embed_url.EmbedUrl)
      setLoading(false);
      console.log(url)
  })
  }, [user, props.tagValue]);

  useEffect(() => {
    const embed = async () => {
      const embeddingContext = await QuickSightEmbedding.createEmbeddingContext();
      const { embedQSearchBar } = embeddingContext;


      const containerDiv = document.getElementById("q");
      
      const frameOptions = {
        url: url,
        container: containerDiv
      };

      const contentOptions = {

      }
      const embeddedVisualExperience = await embedQSearchBar(frameOptions, contentOptions);
      return embeddedVisualExperience;
    };
    embed().then((r) => setEmbedSession(r));
  }, [user,url]);

  return (
    <Flex direction="row" padding="0px 50px 50px 50px" height = "100%" minHeight="100vh">
        <Flex justifyContent="center" width = "100%" padding="50px 50px 50px 50px"
        >
        {loading === false &&
    <Flex
              id="q"
              width = "70%"
            ></Flex>}
    {loading === true &&
        <Loading type = "QSearchBar for"></Loading>
    }
    </Flex></Flex>
  );
}

