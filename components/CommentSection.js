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
} from "@chakra-ui/react";
import React, { useRef } from "react";
import Comment from "./Comment";
import { useRouter } from "next/router";
import { AtSignIcon } from "@chakra-ui/icons";
import { createComment } from "../lib/db";

function CommentSection({ poleId, data }) {
  const inputEl = useRef(null);
  const textEl = useRef(null);
  const router = useRouter();

  //get data

  const onSubmit = (e) => {
    e.preventDefault();
    // const newFeedBack = {
    //   siteId,
    //   route: route || "/",
    //   author: auth.user.name,
    //   authorid: auth.user.uid,
    //   siteid: router.query.siteid,
    //   text: inputEl.current.value,
    //   createdAt: new Date().toISOString(),
    //   provider: auth.user.provider,
    //   status: "pending",
    // };

    const newComment = {
      poleId,
      author: inputEl.current.value,
      body: textEl.current.value,
      createdAt: new Date().toISOString(),
    };

    console.log(inputEl.current.value);
    console.log(textEl.current.value);

    createComment(newComment);

    inputEl.current.value = "";
    textEl.current.value = "";
  };
  return (
    <Box m={4} maxWidth="700px" margin={"0 auto"}>
      <Flex justifyContent={"space-between"}>
        <Heading>Comments</Heading>
      </Flex>
      <Box
        display={"flex"}
        flexDirection="column"
        width={"full"}
        maxWidth="700px"
        margin={"0 auto"}
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={4}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<AtSignIcon />} />
              <Input
                placeholder="name"
                ref={inputEl}
                type="comment"
                id="comment"
                mb={4}
              />
            </InputGroup>

            <Textarea
              placeholder="Start typing here..."
              ref={textEl}
              type="comment"
              id="body"
              mb={4}
            />
            <Button
              type="submit"
              fontWeight={"medium"}
              isDisabled={router.isFallback}
            >
              Add Comment
            </Button>
          </FormControl>
        </Box>
        {data?.map((datafields) => (
          <Comment data={datafields} />
        ))}
      </Box>
    </Box>
  );
}

export default CommentSection;
