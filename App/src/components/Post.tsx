import { Button, Center, Divider, Drawer, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../redux/store";
import { Posts } from "../utility/models";
import locateToken from "../utility/Token";
import SinglePosts from "./SinglePost";

import { BaseEditor, Descendant, createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { AddIcon } from "@chakra-ui/icons";

const { REACT_APP_API_SERVER } = process.env;

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const date = new Date




export default function UserPost() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [posts, setPosts] = useState<Array<Posts>>([]);
  const [editor] = useState(() => withReact(createEditor()))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dietitianInfo = useSelector((state: IRootState) => state.user.dietitian[0])

  const initialValue: Descendant[] = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content') as string) || [
        {
          type: 'paragraph',
          children: [{ text: 'Please input your post here.' }],
        },
      ],
    []
  )

  let content = ""
  let contentToken = localStorage.getItem('content')
  if (contentToken) {
    for (let par of JSON.parse(localStorage.getItem('content') as string)) {
      if (par.children[0].text === '') {
        content += "\n"
        content += "\n"
      }
      content += par.children[0].text
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
    onClose()
    axios
      .post(`${REACT_APP_API_SERVER}/post/${dietitianInfo.id}/${date.toISOString()}`,
        {
          content: content
        }
        , {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        })
      .then(({ data }) => {
        if (data.success) {
          window.localStorage.removeItem('content')

          Swal.fire({
            icon: "success",
            title: "成立發文"
          })
        }
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "發生錯誤，請稍後再試"
        })
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

      <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
        Create Post
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement='top'
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>

          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new post
          </DrawerHeader>


          <Flex>
            <Slate
              editor={editor}
              value={initialValue}
              onChange={value => {
                const isAstChange = editor.operations.some(
                  op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                  const content = JSON.stringify(value)
                  localStorage.setItem('content', content)
                }
              }}
            >
              <Editable
              />
            </Slate>
          </Flex>

          <DrawerFooter
            borderTopWidth='1px'
            justifyContent='center'
            gap='5'
          >
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              onClick={() => postArticle()}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
