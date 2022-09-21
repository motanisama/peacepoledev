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

export default function Home({ poles }) {
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
  return (
    <Box
      as="main"
      w={"full"}
      direction="column"
      h="100vh"
      backgroundColor={"white"}
    >
      <Map poles={poles} />
    </Box>
  );
}
