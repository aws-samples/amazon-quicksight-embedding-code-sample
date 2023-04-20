import React from "react";
import { Button, Image,Flex, Text, TextField, Divider } from "@aws-amplify/ui-react";
import logo from '../img/octanklogo.png';
export default function FooterBottom() {
  return (
    <Flex width="100%" position="absolute" padding="40px 100px 40px 100px" backgroundColor="rgba(123,97,255,1)" direction="column">
      <Flex gap="50px" padding="15px" justifyContent="space-between">
        <Flex direction="column" width="300px" minWidth="300px" shrink="0">
          <Text fontSize="20px" fontWeight="500" children="Sign up for New Letters" color="rgba(255,255,255,1)"></Text>
          <Text children="Sign up for our newsletter!" color="rgba(255,255,255,1)" fontStyle="Italic"></Text>
          <TextField placeholder="Your Email Address" inputStyles={{backgroundColor: 'white'}} />
          <Button backgroundColor="#FFFFFF"> Submit </Button>
        </Flex>
        <Flex direction="column"  shrink="0">
          <Text fontSize="20px" fontWeight="500" children="About Us" color="rgba(255,255,255,1)"></Text>
          <Text children="Careers" color="rgba(255,255,255,1)"></Text>
          <Text children="About Oktank" color="rgba(255,255,255,1)"></Text>
          <Text children="Sustainability" color="rgba(255,255,255,1)"></Text>
        </Flex>
        <Flex direction="column"  shrink="0">
          <Text fontSize="20px" fontWeight="500" children="Selling with Us" color="rgba(255,255,255,1)"></Text>
          <Text children="Sell on Oktank" color="rgba(255,255,255,1)"></Text>
          <Text children="Supply to Oktank" color="rgba(255,255,255,1)"></Text>
          <Text children="Advertise on Oktank" color="rgba(255,255,255,1)"></Text>
        </Flex>
        <Flex direction="column"  shrink="0">
          <Text fontSize="20px" fontWeight="500" children="Our Partners" color="rgba(255,255,255,1)"></Text>
          <Text children="Partner Programs" color="rgba(255,255,255,1)"></Text>
          <Text children="Partner Benefits" color="rgba(255,255,255,1)"></Text>
          <Text children="Become an Oktank Partner" color="rgba(255,255,255,1)"></Text>
        </Flex>
          <Flex direction="column" shrink="0">
          <Text fontSize="20px" fontWeight="500" children="Help" color="rgba(255,255,255,1)"></Text>
          <Text children="Your Account" color="rgba(255,255,255,1)"></Text>
          <Text children="Your Orders" color="rgba(255,255,255,1)"></Text>
          <Text children="Contact Us" color="rgba(255,255,255,1)"></Text>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
      <Flex alignItems="center" justifyContent="center">
        <Image src={logo} width="59px" height="59px"></Image>
        <Text fontSize="20px" fontWeight="400" color="rgba(255,255,255,1)" children="OKTANK Wholesale"></Text>
      </Flex>
    </Flex>
  );
}