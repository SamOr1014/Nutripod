import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../redux/store";
import { Posts } from "../utility/models";
import locateToken from "../utility/Token";
import SinglePosts from "./SinglePost";

import { BaseEditor, Descendant, createEditor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { AddIcon } from "@chakra-ui/icons";
const { REACT_APP_API_SERVER } = process.env;

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const date = new Date();

export default function UserPost() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [posts, setPosts] = useState<Array<Posts>>([]);
  const [contentEditor] = useState(() => withReact(createEditor()));
  const [titleEditor] = useState(() => withReact(createEditor()));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dietitianInfo = useSelector(
    (state: IRootState) => state.user.dietitian[0]
  );

  const initialContentValue: Descendant[] = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content") as string) || [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],// eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  const initialTitleValue: Descendant[] = useMemo(
    () =>
      JSON.parse(localStorage.getItem("title") as string) || [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],// eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  let content = "";
  let title = "";

  async function getContent() {
    let contentToken = localStorage.getItem("content");
    if (contentToken) {
      for (let par of JSON.parse(localStorage.getItem("content") as string)) {
        if (par.children[0].text === "") {
          content += "\n"
        }
        content += par.children[0].text;
      }
    }
  }

  async function getTitle() {
    let titleToken = localStorage.getItem("title");
    if (titleToken) {
      for (let par of JSON.parse(localStorage.getItem("title") as string)) {
        title += par.children[0].text;
      }
    }
  }


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

  async function postArticle() {
    onClose();
    getContent();
    getTitle();
    axios
      .post(
        `${REACT_APP_API_SERVER}/post/${dietitianInfo.id
        }/${date.toISOString()}`,
        {
          content: content,
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.success) {
          window.localStorage.removeItem("content");
          window.localStorage.removeItem("title");
          Swal.fire({
            icon: "success",
            title: "成功出POST",
          });
          fetchAllPost();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "發生錯誤，請稍後再試",
        });
      });
  }
  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      maxW={"100%"}
      p={isSmallerThan600 ? 0 : 2}
      my={2}
      overflow={"auto"}
    >
      {dietitianInfo.id != null ? (
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
          出Post
        </Button>
      ) : (
        <></>
      )}

      <Drawer isOpen={isOpen} onClose={onClose} placement="top" size={"full"} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" textAlign={"center"} fontSize='3xl'>
            請在此刊登你的資訊
          </DrawerHeader>

          <Box
            height="100%"
            width={"80%"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignSelf={"center"}
            margin={"10"}
            border="2px"
            borderRadius={'2xl'}
            borderColor={'gray.400'}
          >
            <Flex flex={1} borderBottom={"2px"} flexDirection="row">
              <Box
                width={isSmallerThan600 ? "97%" : "99%"}
                fontSize={isSmallerThan600 ? "2xl" : "3xl"}
                p={3}
              >
                <Slate
                  editor={titleEditor}
                  value={initialTitleValue}
                  onChange={(value) => {
                    const title = JSON.stringify(value);
                    localStorage.setItem("title", title);
                  }}
                >
                  <Editable
                    placeholder="請在此輸入標題"
                  />
                </Slate>
              </Box>
            </Flex>

            <Flex flex={9}>
              <Box
                width={isSmallerThan600 ? "97%" : "99%"}
                fontSize={isSmallerThan600 ? "2xl" : "3xl"}
                overflow={"auto"}
                p={3}
              >
                <Slate
                  editor={contentEditor}
                  value={initialContentValue}
                  onChange={(value) => {
                    const content = JSON.stringify(value);
                    localStorage.setItem("content", content);
                  }}
                >
                  <Box as={Editable} placeholder="請在此輸入內容" overflow={"auto"} maxH={isSmallerThan600 ? "62vh" : "60vh"}></Box>
                </Slate>
              </Box>
            </Flex>
          </Box>

          <DrawerFooter borderTopWidth="1px" justifyContent="center" gap="5">
            <Button colorScheme="blue" onClick={() => postArticle()}>
              提交
            </Button>
            <Button variant="outline" mr={3} onClick={onClose}>
              取消
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Divider my={4} />
      {posts.map((props) => {
        return (
          <>
            <SinglePosts
              key={`posts_${props.id}`}
              id={props.id}
              title={props.title}
              author={props.first_name + " " + props.last_name}
              authorid={props.author_id}
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
