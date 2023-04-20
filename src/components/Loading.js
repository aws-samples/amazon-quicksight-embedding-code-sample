import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Flex, Loader, Text, Image } from "@aws-amplify/ui-react";
import dashboard from '../img/dashboard.png';



export default function Loading(props) {

    const { user } = useContext(UserContext);

    return (
        <Flex justifyContent="center" direction="column" alignItems="center" padding = "0px 0px 200px 0px">
            <Image src={dashboard} width="59px" height="59px"></Image>
            <Text fontWeight={500} fontSize="1.25em" fontStyle="normal" color="#301934" >Loading {props.type} {user.given_name}</Text>
            <Loader size="small" variation="linear" filledColor="rgba(123,97,255,1)" width = "250px"/>
        </Flex>
        )
    }