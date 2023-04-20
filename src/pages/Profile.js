import { Flex, Image, TextField, Card } from '@aws-amplify/ui-react'
import profile from '../img/profile.png'
import React, { useContext } from 'react';
import {UserContext} from '../context/UserContext'

export default function Profile(){

    const { user } = useContext(UserContext);

    return (
      <div>
      <Flex justifyContent="center" direction="column" alignItems="center" padding="50px">
        <h2>Your Account Information</h2>
        <Card variation="elevated">
          <Flex justifyContent="center" direction="column" alignItems="center">
            <Image src={profile} width="100px" height="100px" shrink="0" position="relative" borderRadius="160px" padding="0px 0px 0px 0px" overflow= "hidden"></Image>
          </Flex>
          <Flex justifyContent="center" direction="column" alignItems="left" padding="50px">
            <TextField placeholder={user['custom:company']} label="Company" isDisabled />
            <TextField placeholder={user.email} label="Email" isDisabled />
            <TextField placeholder={user.given_name} label="First Name" isDisabled />
            <TextField placeholder={user.family_name} label="Last Name" isDisabled />
            <TextField placeholder={user['custom:role']} label="Permissions" isDisabled />
          </Flex>
        </Card>
      </Flex>
    </div>
    );
  }