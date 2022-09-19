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
import BadWordsFilter from "bad-words";
import { useForm } from "react-hook-form";

function CommentSection({ poleId, data }) {
  const inputEl = useRef(null);
  const textEl = useRef(null);
  const router = useRouter();

  const filter = new BadWordsFilter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const comment = register("comment");
  //get data

  const onSubmit = (data) => {
    console.log(data);
    const bodyIsProfane = filter.isProfane(data.body);
    const authorisProfane = filter.isProfane(data.comment);

    if (bodyIsProfane || authorisProfane) {
      return;
    }

    const newComment = {
      poleId,
      author: data.comment,
      body: data.body,
      createdAt: new Date().toISOString(),
    };

    createComment(newComment);
    reset();
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
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("comment", {
                  required: "Required",
                  maxLength: 30,
                })}
              />
            </InputGroup>

            <Textarea
              as={"input"}
              placeholder="Start typing here..."
              ref={textEl}
              type="comment"
              id="body"
              mb={4}
              {...register("body", {
                required: "Required",
                maxLength: "280",
              })}
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
          <Comment data={datafields} key={datafields.createdAt} />
        ))}
      </Box>
    </Box>
  );
}

export default CommentSection;
