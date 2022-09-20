import { Divider, Flex, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../redux/store";
import { Posts } from "../utility/models";
import locateToken from "../utility/Token";
import SinglePosts from "./SinglePost";

const { REACT_APP_API_SERVER } = process.env;

export default function UserPost() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  const [posts, setPosts] = useState<Array<Posts>>([]);

  //API functions
  async function fetchAllPost() {
    axios
      .get(`${REACT_APP_API_SERVER}/post/all`, {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      })
      .then(({ data }) => {
        setPosts(data.posts);
      });
  }

  useEffect(() => {
    fetchAllPost();
  }, [posts]);

  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      p={isSmallerThan600 ? 0 : 2}
      my={2}
      overflow={"auto"}
    >
      <Divider my={4} />
      {/* Post Area */}
      {posts.map((props) => {
        return (
          <>
            <SinglePosts
              id={props.id}
              title={props.title}
              author={props.first_name + " " + props.last_name}
              time={props.date}
              content={props.content}
              refresh={fetchAllPost}
            />
          </>
        );
      })}
    </Flex>
  );
}
