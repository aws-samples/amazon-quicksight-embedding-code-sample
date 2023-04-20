import React from "react";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function FooterTop() {
  return (
    <Flex
      width="100%"
      height="200px"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      padding="40px 100px 40px 100px"
      backgroundColor="rgba(239,240,240,1)"
    >
        <Flex
          gap="16px"
          direction="column"
          width="292px"
          alignSelf="stretch"
          position="relative"
          shrink="0"
        >
          <Text
            fontSize="20px"
            fontWeight="700"
            lineHeight="25px"
            textAlign="left"
            display="flex"
            direction="column"
            position="relative"
            children="Furniture"
          ></Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="24px"
            textAlign="left"
            direction="column"
            children="Choose from our wide collection of office chairs, tables, and decor to your taste. Our global network of suppliers are ready to provide the best comfort wherever you are."
          ></Text>
        </Flex>
        <Flex
          gap="16px"
          direction="column"
          width="292px"
          alignSelf="stretch"
          position="relative"
          shrink="0"
        >
          <Text
            fontSize="20px"
            fontWeight="700"
            lineHeight="25px"
            textAlign="left"
            display="flex"
            direction="column"

            children="Office Supplies"
          ></Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="24px"
            textAlign="left"
            direction="column"
            children="From envelopes to staples, we have every kind of office supply you would need to boost productivity in your office space. Purchase in bulk for additional cost savings!"
          ></Text>
        </Flex>
        <Flex
          gap="16px"
          direction="column"
          width="292px"
          alignSelf="stretch"
          position="relative"
          shrink="0"
        >
          <Text
            fontSize="20px"
            fontWeight="700"
            lineHeight="25px"
            textAlign="left"
            display="flex"
            direction="column"

            children="Electronics"
          ></Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="24px"
            textAlign="left"
            direction="column"
            children="Take care of all your electronics needs here at Oktank Wholesale. Whether it be printers or docking stations, take care of all your electronics needs in one space."
          ></Text>
        </Flex>
        <Flex
          gap="16px"
          direction="column"
          width="292px"

          alignSelf="stretch"
          position="relative"
          shrink="0"
        >
          <Text
            fontSize="20px"
            fontWeight="700"
            lineHeight="25px"
            textAlign="left"
            display="flex"
            direction="column"
            children="Cleaning"
          ></Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="24px"
            textAlign="left"
            direction="column"
            children="A tidy office space is key to success! Keep your working area clean with all sorts of cleaning supplies."
          ></Text>
        </Flex>
    </Flex>
  );
}