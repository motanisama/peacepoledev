import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";

import { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
// import Map from "../components/Map";
import PoleBody from "../components/PoleBody";
import {
  createComment,
  createUser,
  getPoles,
  getSinglePole,
  getUsers,
} from "../lib/db";
import Map from "../components/Map";
import MainPagePeacePole from "../components/MainPagePeacePole";

export async function getStaticProps() {
  const { poles } = await getPoles();

  //getstatic props return data as props to react componenet

  return {
    props: {
      poles,
    },
    revalidate: 1,
    // will be passed to the page component as props
  };
}

export default function Home({ poles, children }) {
  //   useEffect(() => {
  //     getData();
  //   }, []);

  // const getData = async () => {
  //   const users = await getPoles();
  //   const user = await getSinglePole("xwsJQlXemhATjl5Cv2PT");
  //   setData(user);
  //   console.log(userData);
  //   console.log(users);
  // };

  // const [userData, setData] = useState();

  const mapContainerStyle = {
    width: "100%",
    height: "50vh",
  };
  return (
    <Box
      height={"100%"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        as="main"
        w={"full"}
        h="100vh"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Flex
          backgroundColor="white"
          backgroundImage={"linear-gradient(270deg, #4299e1 0%, #ffffff 75%);"}
          w="full"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            pt={4}
            pb={4}
            maxW="1280px"
            margin="0 auto"
            w="full"
            h="100px"
          >
            <Flex align="center" height={"100%"}>
              <Image src="/2.png" maxH={"100%"} />
            </Flex>
          </Flex>
        </Flex>

        <Box
          w={"full"}
          h={"50%"}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          maxWidth={"1280px"}
          my={4}
        >
          <Stack
            w={"50%"}
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
                  Hawai'i.
                </Text>
                <br />
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
                  Peace Pole.
                </Text>
                <br />
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
                  Project.
                </Text>
              </Heading>
              <Text color={"gray.500"} fontSize={"lg"}>
                A Peace Pole is an internationally-recognized symbol of the
                hopes and dreams of the entire human family, standing vigil in
                silent prayer for peace on earth. Each Peace Pole bears the
                message May Peace Prevail on Earth in different languages on
                each of its four or six sides. There are estimated over 250,000
                Peace Poles in every country in the world dedicated as monuments
                to peace.
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"red"}
                  bg={"blue.400"}
                  _hover={{ bg: "blue.500" }}
                >
                  Find Near me
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Box
            w={"50%"}
            h={"100%"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            overflow={"hidden"}
          >
            <Map size={mapContainerStyle} />
          </Box>
        </Box>
        <Box w={"full"} h={"100%"}>
          <Box
            flexDirection={{ base: "column", md: "row" }}
            display={"flex"}
            h={"100%"}
            justifyContent={"center"}
          >
            <Box
              w={"50%"}
              h={"75%"}
              maxW={"24rem"}
              backgroundColor={"white"}
              rounded={"xl"}
              boxShadow={"xl"}
              overflow={"hidden"}
              m={4}
              p={[4, 8]}
              display={"flex"}
              flexDirection={"column"}
            >
              <Heading size={"4xl"}>🤝</Heading>
              <Heading size={"lg"}>Visit</Heading>
              <Heading size={"md"} color={"gray.500"}>
                Gather your friends. Gather your family. Go out and find them
                all.
              </Heading>
            </Box>
            <Box
              w={"50%"}
              h={"75%"}
              maxW={"24rem"}
              backgroundColor={"white"}
              rounded={"xl"}
              boxShadow={"xl"}
              overflow={"hidden"}
              m={4}
              p={[4, 8]}
              display={"flex"}
              flexDirection={"column"}
            >
              <Heading size={"4xl"}>✍️</Heading>
              <Heading size={"lg"}>Share</Heading>
              <Heading size={"md"} color={"gray.500"}>
                Scan the QR code. Leave a comment. Share on social media.
              </Heading>
            </Box>
            <Box
              w={"50%"}
              h={"75%"}
              maxW={"24rem"}
              backgroundColor={"white"}
              rounded={"xl"}
              boxShadow={"xl"}
              overflow={"hidden"}
              m={4}
              p={[4, 8]}
              display={"flex"}
              flexDirection={"column"}
            >
              <Heading size={"4xl"}>✌️ </Heading>
              <Heading size={"lg"}>Remember</Heading>
              <Heading size={"md"} color={"gray.500"}>
                Learn what each pole symbolizes. Spread peace. Spread life.
              </Heading>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
