import { Button, Flex, Image, SearchField, Text,Link } from "@aws-amplify/ui-react";
import logo from '../img/octanklogo.png';
import profile from '../img/profile.png'
import React, { useContext } from 'react';
import {UserContext} from '../context/UserContext'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

    

export default function NavBar() {

  const { user } = useContext(UserContext);

  async function onSignOutClick() {
    console.log(Auth.signOut());
    sessionStorage.clear();
    navigate('/');

 }
    
  const navigate = useNavigate();

  return (
    <Flex
      gap="20px"
      width='100%'
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      padding="24px 32px 24px 32px"
      backgroundColor="rgba(123,97,255,1)"
    >
      <ReactRouterLink to="/" component={Link} style={{ textDecoration: 'none' }}>
        <Flex
          gap="10px"
          width="261px"
          justifyContent="flex-left"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
        >
          <Image
            src={logo}
            width="59px"
            height="59px"
          ></Image>
          <Text
            fontSize="20px"
            fontWeight="400"
            color="rgba(255,255,255,1)"
            children="OKTANK Wholesale"
          ></Text>
          
        </Flex>
      </ReactRouterLink>
      <Flex
        gap="20px"
        width="500px"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="auto"
        height="45px"
        position="relative"
        padding="0px 0px 0px 0px"
      >
        <SearchField
          display="flex"
          gap="8px"
          direction="column"
          width="100vw"

          basis="auto"
          height="40px"
          position="relative"
          padding="0px 0px 0px 0px"
          placeholder="Search"
          size="default"
          isDisabled={false}
          labelHidden={true}
          variation="default"
          inputStyles={{backgroundColor: 'white'}}
        ></SearchField>
        <ReactRouterLink to="/Profile" component={Link} style={{ textDecoration: 'none' }}>
          <Flex           
          width="200px"
          justifyContent="flex-left"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px">
        <Text
          fontFamily="Inter"
          fontSize="20px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          justifyContent="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          children={`${"Hello, "}${user.given_name}`}
        ></Text>
        
        <Image
          src={profile}
          width="45px"
          height="45px"
          shrink="0"
          position="relative"
          borderRadius="160px"
          padding="0px 0px 0px 0px"
          overflow= "hidden"
        ></Image>
        </Flex>
        </ReactRouterLink>
          <Button
            display="flex"
            gap="0"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            size="small"
            isDisabled={false}
            variation="primary"
            children="Sign Out"
            onClick={onSignOutClick}
          ></Button>
      </Flex>
    </Flex>
  );
}
