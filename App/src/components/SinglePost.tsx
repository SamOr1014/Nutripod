import {
  Heading,
  Divider,
  Text,
  useMediaQuery,
  CloseButton,
  LinkBox,
  LinkOverlay,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../redux/store";
import { PostTemplate } from "../utility/models";
import locateToken from "../utility/Token";
import { Link as ReactLink } from "react-router-dom";

const { REACT_APP_API_SERVER } = process.env;

export default function SinglePosts(props: PostTemplate) {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const dietitianInfo = useSelector(
    (state: IRootState) => state.user.dietitian[0]
  );

  const isLoggedInByUser = useSelector(
    (state: IRootState) => state.user.user[0].is_user
  );
  const isDietitian = useSelector(
    (state: IRootState) => state.user.dietitian[0].is_user
  );

  const urlRoute =
    isLoggedInByUser === null && isDietitian === false
      ? "/dietitian"
      : "/dashboard";

  //API function
  async function deleteOnePost(pid: number) {
    axios
      .delete(`${REACT_APP_API_SERVER}/post/${pid}`, {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "成功移除",
        });
      });
  }
  return (
    <>
      <LinkBox
        as={"article"}
        maxH={"120px"}
        maxW={"95vw"}
        flexDir={"column"}
        display={"flex"}
        flex={1}
      >
        <Heading
          fontSize={isSmallerThan600 ? "md" : "lg"}
          overflow={"hidden"}
          alignItems={"center"}
          display={"flex"}
          gap={2}
        >
          <Avatar
            size="sm"
            src={`https://i.pravatar.cc/500?img=${props.authorid}`}
          />
          <Text flex={1}>{props.author}</Text>
        </Heading>

        <Heading
          fontSize={isSmallerThan600 ? "lg" : "2xl"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
        >
          <LinkOverlay as={ReactLink} to={`${urlRoute}/posts/${props.id}`}>
            {props.title}
          </LinkOverlay>
        </Heading>
        <Text fontSize={isSmallerThan600 ? "xs" : "sm"}>
          {new Date(props.time).toLocaleDateString()}
        </Text>
        {dietitianInfo.id !== null ? (
          <CloseButton
            pos={"absolute"}
            size={"sm"}
            onClick={() => {
              deleteOnePost(props.id);
              props.refresh();
            }}
            right={2}
          />
        ) : (
          ""
        )}
        <Divider my={4} />
      </LinkBox>
    </>
  );
}
