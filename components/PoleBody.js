import { Text, Box, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { AtSignIcon, ExternalLinkIcon } from "@chakra-ui/icons";

function PoleBody() {
  return (
    <Box m={4} mt={4} maxWidth="700px" margin={"0 auto"}>
      <Heading mb={2}>Hilo's main pole</Heading>
      <Heading mb={2} size={"md"}>
        Description
      </Heading>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Text>
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
