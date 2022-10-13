import { Text, Box, Heading, IconButton, Button } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { AtSignIcon, ExternalLinkIcon } from "@chakra-ui/icons";

function PoleBody({ pole }) {
  function renderDescription(desc) {
    if (desc === "n/a") {
      return false;
    }

    return desc;
  }

  return (
    <Box m={4} mt={4} maxWidth="700px" margin={"0 auto"}>
      <Heading mb={2}>{pole.title}</Heading>

      <Heading size={"md"}>Sponsor</Heading>
      <Text>{pole.sponsor}</Text>
      <Text mb={4} as="div" whiteSpace={"pre-line"}>
        {renderDescription(pole.Description.replaceAll("\\n", "\n"))}
      </Text>

      <Heading size={"md"}>Purpose</Heading>
      <Text mb={4}>{pole.importance}</Text>
      <Heading size={"md"}>Location of Peace Pole</Heading>
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
        <Button
          as={"a"}
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${pole.geo.lat}%2C${pole.geo.lng}`}
          colorScheme="teal"
          aria-label="Call Segun"
          size="lg"
          icon={<ExternalLinkIcon />}
          margin={2}
        >
          Directions
        </Button>
      </Box>
    </Box>
  );
}

export default PoleBody;
