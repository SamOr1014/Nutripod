import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Stack,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FullSinglePost } from "../utility/models";
import locateToken from "../utility/Token";

const { REACT_APP_API_SERVER } = process.env;

export default function FullPost() {
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
  }, [postContent]);
  return (
    <>
      {postContent
        ? postContent.map((post) => {
            return (
              <Flex
                w={isSmallerThan600 ? "100%" : "80%"}
                h={isSmallerThan600 ? "auto" : "720px"}
                bg={"gray.500"}
                p={10}
                rounded={"3xl"}
                key={`post_id_${post.id}`}
                overflow={"auto"}
              >
                <Stack gap={6}>
                  <Heading fontStyle={"3xl"}>{post.title}</Heading>
                  <HStack fontSize={"lg"}>
                    <Avatar
                      name={`${post.first_name + " " + post.last_name}`}
                      src="https://bit.ly/broken-link"
                    />
                    <Text>{post.first_name + " " + post.last_name}</Text>
                    <Text>- {new Date(post.date).toLocaleDateString()}</Text>
                  </HStack>
                  <Text fontSize={"2xl"}>{post.content}</Text>
                </Stack>
              </Flex>
            );
          })
        : ""}
    </>
  );
}
