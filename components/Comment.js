import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Comment({ data }) {
  console.log(data);
  return (
    <Box border={"2px"} borderRadius={"4px"} m={2} borderColor={"gray.100"}>
      <Heading m={2}>@{data.author}</Heading>
      <Text m={2} className="commentBody">
        {data.body}
      </Text>
      <Box m={2} direction="column" justify={"center"} align={"end"}>
        {data.createdAt}
      </Box>
    </Box>
  );
}

export default Comment;
