import { Text, Box, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { AtSignIcon, ExternalLinkIcon } from "@chakra-ui/icons";

function PoleBody({ pole }) {
  console.log(pole);
  console.log(pole.Description);

  return (
    <Box m={4} mt={4} maxWidth="700px" margin={"0 auto"}>
      <Heading mb={2}>{pole.title}</Heading>
      <Heading mb={2} size={"md"}>
        Description
      </Heading>
      <Text>{pole.sponsor}</Text>
      <Text as="div" whiteSpace={"pre-line"}>
        {pole.Description.replaceAll("\\n", "\n")}
      </Text>
      <Text>{pole.importance}</Text>
      <Text>{pole.address}</Text>
      <Box direction="column" justify={"center"} align={"end"}>
        <IconButton
          as={"a"}
          href="https://www.facebook.com/Peace.Poles/"
          colorScheme="teal"
          aria-label="Call Segun"
          size="lg"
          icon={<AtSignIcon />}
          margin={2}
        ></IconButton>
        <IconButton
          as={"a"}
          href="https://rotaryd5000.org/"
          colorScheme="teal"
          aria-label="Call Segun"
          size="lg"
          icon={<ExternalLinkIcon />}
          margin={2}
        />
      </Box>
    </Box>
  );
}

export default PoleBody;
