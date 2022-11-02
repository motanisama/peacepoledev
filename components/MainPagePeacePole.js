import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

function MainPagePeacePole() {
  return (
    <Box
      h={"50vh"}
      w={"100%"}
      display={"flex"}
      maxWidth={"1280px"}
      flexDirection={"column"}
    >
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 2, md: 4 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Peace Poles Hawai'i
            </Text>
          </Heading>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MainPagePeacePole;
