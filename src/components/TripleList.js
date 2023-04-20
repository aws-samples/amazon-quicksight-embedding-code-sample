import React from "react";
import { Button, Divider, Flex, Image, Text } from "@aws-amplify/ui-react";
import casepacks from '../img/casepacks.png';
import pallets from '../img/pallets.png';
import quantitydiscounts from '../img/quantitydiscounts.png'

export default function TripleList() {

  return (
    <Flex
      gap="24px"
      width="1440px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      padding="24px 24px 24px 24px"
      backgroundColor="rgba(239,240,240,1)"

    >
      <Flex
        gap="24px"
        width="1000px"
        alignItems="flex-start"
        grow="1"
        basis="1392px"
        height="447px"
        position="relative"
        padding="0px 0px 0px 0px"
      >
        <Flex
          gap="24px"
          direction="column"
          width="448px"
          justifyContent="center"
          alignItems="center"
          grow="1"
          basis="448px"
          height="447px"
          position="relative"
          padding="24px 24px 24px 24px"
          backgroundColor="rgba(255,255,255,1)"
        >
          <Text
            fontFamily="Inter"
            fontSize="24px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="30px"
            textAlign="center"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Case Packs"
          ></Text>
          <Image
            src={casepacks}
            width="200px"
            height="200px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
          ></Image>
          <Button
            display="flex"
            gap="0"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            size="large"
            isDisabled={false}
            variation="primary"
            children="Get Case Packs"
          ></Button>
          <Divider
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            size="default"
            orientation="horizontal"
          ></Divider>
          <Text
            fontFamily="Inter"
            fontSize="20px"
            fontWeight="300"
            color="rgba(92,102,112,1)"
            lineHeight="25px"
            textAlign="center"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Shop all products in case packs"
          ></Text>
        </Flex>
        <Flex
          gap="24px"
          direction="column"
          width="448px"
          justifyContent="center"
          alignItems="center"
          grow="1"
          basis="448px"
          height="447px"
          position="relative"
          padding="24px 24px 24px 24px"
          backgroundColor="rgba(255,255,255,1)"
        >
          <Text
            fontFamily="Inter"
            fontSize="24px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="30px"
            textAlign="center"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Quantity Discounts"
          ></Text>
          <Image
            src={pallets}
            width="200px"
            height="200px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
          ></Image>
          <Button
            display="flex"
            gap="0"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            size="large"
            isDisabled={false}
            variation="primary"
            children="Get Quantity Discounts"
          ></Button>
          <Divider
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            size="default"
            orientation="horizontal"
          ></Divider>
          <Text
            fontFamily="Inter"
            fontSize="20px"
            fontWeight="300"
            color="rgba(92,102,112,1)"
            lineHeight="25px"
            textAlign="center"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Save up to 10%"
          ></Text>
        </Flex>
        <Flex
          gap="24px"
          direction="column"
          width="448px"
          justifyContent="center"
          alignItems="center"
          grow="1"
          basis="448px"
          height="447px"
          position="relative"
          padding="24px 24px 24px 24px"
          backgroundColor="rgba(255,255,255,1)"
        >
          <Text
            fontFamily="Inter"
            fontSize="24px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="30px"
            textAlign="center"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Pallets"
          ></Text>
          <Image
            src={quantitydiscounts}
            width="200px"
            height="200px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
          ></Image>
          <Button
            display="flex"
            gap="0"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            size="large"
            isDisabled={false}
            variation="primary"
            children="Get Pallets"
          ></Button>
          <Divider
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            size="default"
            orientation="horizontal"
          ></Divider>
          <Text
            fontFamily="Inter"
            fontSize="20px"
            fontWeight="300"
            color="rgba(92,102,112,1)"
            lineHeight="25px"
            textAlign="center"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Get pallets on supplies"
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}