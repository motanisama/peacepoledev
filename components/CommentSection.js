import {
  Box,
  Text,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import Comment from "./Comment";
import { useRouter } from "next/router";
import { AtSignIcon } from "@chakra-ui/icons";
import { createComment } from "../lib/db";
import BadWordsFilter from "bad-words";
import { useForm } from "react-hook-form";
import HookForm from "./TestForm";

function CommentSection({ poleId, data }) {
  const router = useRouter();

  return (
    <Box m={4} maxWidth="700px" margin={"0 auto"}>
      <Flex justifyContent={"space-between"}>
        <Heading>Leave a note!</Heading>
      </Flex>
      <Box
        display={"flex"}
        flexDirection="column"
        width={"full"}
        maxWidth="700px"
        margin={"0 auto"}
      >
        <HookForm poleId={poleId} />
        {data?.map((datafields) => (
          <Comment data={datafields} key={datafields.createdAt} />
        ))}
      </Box>
    </Box>
  );
}

export default CommentSection;
