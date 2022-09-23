import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Stack,
  useMediaQuery,
  Text,
  Divider,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FullSinglePost } from "../utility/models";
import locateToken from "../utility/Token";

const { REACT_APP_API_SERVER } = process.env;

export default function FullPost() {
  const bg = useColorModeValue("gray.200", "gray.700");
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const { id } = useParams();
  const [postContent, setPostContent] = useState<Array<FullSinglePost>>([]);
  //API Function
  async function fetchSinglePost() {
    axios
      .get(`${REACT_APP_API_SERVER}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      })
      .then(({ data }) => {
        setPostContent(data.post);
      });
  }

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  function getText(article: string) {
    const newText = article.split("\n").map((str) => (
      <Text fontSize={"xl"}>
        {str}
        <br></br>
      </Text>
    ));
    return newText;
  }

  return (
    <>
      {postContent
        ? postContent.map((post) => {
            return (
              <Flex
                w={isSmallerThan600 ? "100%" : "80%"}
                h={isSmallerThan600 ? "auto" : "720px"}
                bg={bg}
                p={10}
                rounded={"3xl"}
                key={`fullPost_id_${post.id}`}
                overflow={"auto"}
              >
                <Stack gap={4} width={"100%"}>
                  <Heading fontStyle={"3xl"}>{post.title}</Heading>
                  <HStack fontSize={"lg"}>
                    <Avatar
                      name={`${post.first_name + " " + post.last_name}`}
                      src="https://bit.ly/broken-link"
                    />
                    <Text>{post.first_name + " " + post.last_name}</Text>
                    <Text>- {new Date(post.date).toLocaleDateString()}</Text>
                  </HStack>
                  <Divider />
                  <Box overflow={"auto"} w={"100%"}>
                    {getText(post.content)}
                  </Box>
                </Stack>
              </Flex>
            );
          })
        : ""}
    </>
  );
}
