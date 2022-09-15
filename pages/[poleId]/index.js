import CommentSection from "../../components/CommentSection";
import PoleBody from "../../components/PoleBody";
import { Box, Button, Text } from "@chakra-ui/react";
import Map from "../../components/Map";
import { getCommments, getPoles, getSinglePole } from "../../lib/db";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// export async function getStaticProps(context) {
//   const [poleId] = context.params.pole;

//   //getstatic props return data as props to react componenet
//   const { pole } = await getSinglePole(poleId);

//   return {
//     props: {
//       pole,
//     },
//     revalidate: 1,
//     // will be passed to the page component as props
//   };
// }

// // need to get data and pass to props
// export async function getStaticPaths() {
//   const { poles } = await getPoles();
//   console.log(poles);

//   const paths = poles.map((pole) => ({
//     params: {
//       pole: [pole.id.toString()],
//     },
//   }));
//   return {
//     paths: paths,
//     fallback: true,
//   };
// }

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const queryId = router.query.poleId;
    const onGetComments = async () => {
      const comments = await getCommments("xwsJQlXemhATjl5Cv2PT");
      console.log(comments);
      setComments(comments);
    };
    onGetComments();
  }, []);

  const [comments, setComments] = useState([]);

  return (
    <Box
      as="main"
      w={"full"}
      direction="column"
      h="100vh"
      backgroundColor={"white"}
    >
      <Map />
      <PoleBody />
      <CommentSection poleId={router.query.poleId} data={comments.comments} />
    </Box>
  );
}
