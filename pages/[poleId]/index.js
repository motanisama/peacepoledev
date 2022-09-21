import CommentSection from "../../components/CommentSection";
import PoleBody from "../../components/PoleBody";
import { Box, Button, Text } from "@chakra-ui/react";
import Map from "../../components/Map";
import { getCommments, getPoles, getSinglePole } from "../../lib/db";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useComments } from "../../lib/hooks";
import HookForm from "../../components/TestForm";

export async function getStaticProps(context) {
  const poleId = context.params.poleId;

  //getstatic props return data as props to react componenet
  const { pole } = await getSinglePole(poleId);

  return {
    props: {
      pole,
    },
    revalidate: 1,
    // will be passed to the page component as props
  };
}

// need to get data and pass to props
export async function getStaticPaths() {
  const { poles } = await getPoles();

  const paths = poles.map((pole) => ({
    params: {
      poleId: pole.id.toString(),
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export default function Home({ pole }) {
  const router = useRouter();
  console.log(router.query.poleId);
  const { allcomments } = useComments(pole.id);

  return (
    <Box
      as="main"
      w={"full"}
      direction="column"
      h="100vh"
      backgroundColor={"white"}
    >
      <Map />
      {pole && <PoleBody pole={pole} />}
      {allcomments && (
        <CommentSection poleId={router.query.poleId} data={allcomments} />
      )}
    </Box>
  );
}
