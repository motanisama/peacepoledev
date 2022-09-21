import { Box, Button, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
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

export default function Home() {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const users = await getPoles();
    const user = await getSinglePole("xwsJQlXemhATjl5Cv2PT");
    setData(user);
    console.log(userData);
    console.log(users);
  };

  const [userData, setData] = useState();

  const onPressed = () => {
    const user = createUser("2142151", {
      test: "test",
      date: "test",
    });
  };

  const onCLicked = () => {
    const comment = createComment("2121321", {
      poleid: "dsdsa",
      timestamp: "test",
      name: "Matt",
      body: "new commment!",
    });
  };
  return (
    <Box
      as="main"
      w={"full"}
      direction="column"
      h="100vh"
      backgroundColor={"white"}
    >
      <Button onClick={getData}>click</Button>

      <Map />
    </Box>
  );
}
