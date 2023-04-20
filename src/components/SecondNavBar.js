import React, { useContext} from "react"; 
import { Flex, Text, Link, SwitchField, Badge } from "@aws-amplify/ui-react"; 
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'; 
import {EmbedTypeContext } from '../context/EmbedTypeContext';
import {UserContext} from '../context/UserContext'

export default function SecondNavBar() { 

  const { embedType, setEmbedType, embedViewType, setEmbedViewType } = useContext(EmbedTypeContext);
  const { user } = useContext(UserContext);

  const toggleEmbedType = () => {
    if (embedType === "User-Based Embedding"){
      setEmbedType("Anonymous Embedding");
      setEmbedViewType('Dashboard View');
      sessionStorage.setItem("embedType", "Anonymous Embedding");
      sessionStorage.setItem("embedViewType", 'Dashboard View');}
    else{
      setEmbedType("User-Based Embedding");
      setEmbedViewType('Dashboard View');
      sessionStorage.setItem("embedType", "User-Based Embedding");
      sessionStorage.setItem("embedViewType", 'Dashboard View');}
    }
  

  const selectEmbedViewType = (type) => {

    setEmbedViewType(type);
    sessionStorage.setItem("embedViewType", type);
    console.log(embedViewType)
  }

  const location = useLocation();
  console.log(location.pathname)

return ( 
  <Flex gap="20px" width='100%' justifyContent="space-between" alignItems="center" padding="14px 40px 14px 40px" backgroundColor="rgba(239,240,240,1)">
    <Flex alignItems="center">
    { location.pathname === "/Dashboard" &&
    <>
    <SwitchField
  isDisabled={false}
  onChange = {toggleEmbedType}
  trackColor = "rgba(123,97,255,1)"
  trackCheckedColor = "rgba(123,97,255,1)"
/>
<Text>{embedType}</Text></>}
      {embedType === "User-Based Embedding" && embedViewType === 'Visual View' && user['custom:role'] === "Author" && location.pathname === "/Dashboard" &&
      <><Badge variation='info' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      {/* <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge> */}
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Console View')}>Console View</Badge>
      </>}  
      {embedType === "User-Based Embedding" && embedViewType === 'Dashboard View' && user['custom:role'] === "Author" && location.pathname === "/Dashboard" &&
      <><Badge variation='default' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='info' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      {/* <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge> */}
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Console View')}>Console View</Badge>
      </>}
      {embedType === "User-Based Embedding" && embedViewType === 'Q-Bar View' && user['custom:role'] === "Author" && location.pathname === "/Dashboard" &&
      <><Badge variation='default' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      {/* <Badge variation='info' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge> */}
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Console View')}>Console View</Badge>
      </>}
      {embedType === "User-Based Embedding" && embedViewType === 'Console View' && user['custom:role'] === "Author" && location.pathname === "/Dashboard" &&
      <><Badge variation='default' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      {/* <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge> */}
      <Badge variation='info' size="small" onClick={() => selectEmbedViewType('Console View')}>Console View</Badge>
      </>}
      {embedType === "User-Based Embedding" && embedViewType === 'Visual View' && user['custom:role'] === "Reader" && location.pathname === "/Dashboard" &&
      <><Badge variation='info' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      {/* <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge> */}
      </>}  
      {embedType === "User-Based Embedding" && embedViewType === 'Dashboard View' && user['custom:role'] === "Reader" && location.pathname === "/Dashboard" &&
      <><Badge variation='default' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='info' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      {/* <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge> */}
      </>}
      {embedType === "User-Based Embedding" && embedViewType === 'Q-Bar View' && user['custom:role'] === "Reader" && location.pathname === "/Dashboard" &&
      <><Badge variation='default' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      {/* <Badge variation='info' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge> */}
      </>}
      {embedType === "Anonymous Embedding" && embedViewType === 'Visual View' && location.pathname === "/Dashboard" &&
      <><Badge variation='info' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge>
      </>}  
      {embedType === "Anonymous Embedding" && embedViewType === 'Dashboard View' && location.pathname === "/Dashboard" &&
      <><Badge variation='default' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='info' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge>
      </>}
      {embedType === "Anonymous Embedding" && embedViewType === 'Q-Bar View' && location.pathname === "/Dashboard" &&
      <><Badge variation='default' size="small" onClick={() => selectEmbedViewType('Visual View')}>Visual View</Badge>
      <Badge variation='default' size="small" onClick={() => selectEmbedViewType('Dashboard View')}>Dashboard View</Badge>
      <Badge variation='info' size="small" onClick={() => selectEmbedViewType('Q-Bar View')}>Q-Bar View</Badge>
      </>}
    </Flex>
    <Flex gap="70px" width="300px" justifyContent="right" alignItems="center" alignSelf="stretch" position="relative">
      <ReactRouterLink to="/Dashboard" component={Link} style={{ textDecoration: 'none', color:'#000000'}}>Dashboard</ReactRouterLink>
      <ReactRouterLink to="/Profile" component={Link} style={{ textDecoration: 'none', color:'#000000'}}>Profile</ReactRouterLink>
    </Flex>
  </Flex> 
); 
}