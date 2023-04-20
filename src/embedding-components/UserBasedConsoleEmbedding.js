import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/UserContext'
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { Flex, Divider } from "@aws-amplify/ui-react";
import { Loading } from '../components'
import * as queries from '../graphql/queries';
import * as QuickSightEmbedding from "amazon-quicksight-embedding-sdk";


export default function ConsoleEmbedding() {

    const [url, setUrl] = useState("");
    const [embedSession, setEmbedSession] = useState();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    async function getIdentityId() {
        var session = await Auth.currentSession()
        var IdToken = session.getIdToken()
        return IdToken
    }


    useEffect(() => {

        const fetchDashboard = async () => {
            const token = await getIdentityId();

            const res = await API.graphql(
                graphqlOperation(queries.userBasedConsoleEmbedding, { openIdToken: JSON.stringify(token) }));
            const http_response = JSON.parse(res.data.userBasedConsoleEmbedding);
            console.log('graphql response: ', http_response);
            return http_response;
        }
        setLoading(true);
        fetchDashboard().then(r => {
            setUrl(r.EmbedUrl.EmbedUrl);
            setLoading(false);
        })


    }, [user])

    useEffect(() => {
        const embed = async () => {
            const embeddingContext = await QuickSightEmbedding.createEmbeddingContext();
            const { embedConsole } = embeddingContext;


            const containerDiv = document.getElementById("console");

            const frameOptions = {
                url: url,
                height: "100%",
                width: "100%",
                container: containerDiv
            };

            const contentOptions = {

            }
            const embeddedConsoleExperience = await embedConsole(frameOptions, contentOptions);
            return embeddedConsoleExperience;
        };
        embed().then((r) => setEmbedSession(r));
    }, [url]);


    return (
        <Flex justifyContent="center" height="100%" minHeight="100vh" gap="0rem">

            {loading === true &&

                <Loading type="Analytics console for"></Loading>
            }
            {loading === false &&

                <Flex
                    id="console"
                    style={{ width: "95%", height: "100vh" }}
                ></Flex>}
        </Flex>
    );
}
