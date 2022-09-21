import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  Box,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  FormHelperText,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import BadWordsFilter from "bad-words";
import { createComment } from "../lib/db";
import { useState } from "react";

export default function HookForm({ poleId }) {
  const [bodyCount, setCount] = useState(0);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const filter = new BadWordsFilter();
  console.log(bodyCount);
  function onSubmit(data) {
    console.log(data);
    const bodyIsProfane = filter.isProfane(data.body);
    const authorisProfane = filter.isProfane(data.name);

    const newComment = {
      poleId,
      author: data.name,
      body: data.body,
      createdAt: new Date().toISOString(),
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        if (authorisProfane) {
          setError("name", {
            type: "manual",
            message: "Inappropriate content",
          });
        }

        if (bodyIsProfane) {
          setError("body", {
            type: "manual",
            message: "Inappropriate content",
          });
        }
        if (!bodyIsProfane || !authorisProfane) {
          createComment(newComment);
        }
        resolve();
      }, 3000);
    });
  }

  return (
    <Box as="form" my={2} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <InputGroup my={2}>
          <InputLeftAddon children={<AtSignIcon />} />
          <Input
            id="name"
            placeholder="name..."
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.body}>
        <FormLabel htmlFor="body">Body</FormLabel>
        <Textarea
          my={2}
          id="body"
          placeholder="Enter a note with 240 characters..."
          {...register("body", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
            maxLength: { value: 240, message: "240 Character limit" },
          })}
        />

        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </Box>
  );
}
