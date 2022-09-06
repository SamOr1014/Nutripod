import { Button, Center, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import {
  BsFillHouseFill,
  BsTable,
  BsFillChatRightTextFill,
  BsArchiveFill,
  BsFillFileMedicalFill,
} from "react-icons/bs";

interface OptionalFunction {
  closeDrawer?: (state: any) => void;
}

export default function DietitianNavLinks(props: OptionalFunction) {
  return (
    <>
      <Link to="/dietitian" as={ReactLink}>
        <Button
          w="16"
          h="16"
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsFillHouseFill size="30px" />
          <Text mt={1}>主頁</Text>
        </Button>
      </Link>
      <Link to="/dietitian/" as={ReactLink}>
        <Button
          w="16"
          h="16"
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsTable size="30px" />
          <Text mt={1}>預約</Text>
        </Button>
      </Link>
      <Link to="/dietitian/patients" as={ReactLink}>
        <Button
          w="16"
          h="16"
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsFillFileMedicalFill size="30px" />
          <Text mt={1} fontSize="xs">
            病人記錄
          </Text>
        </Button>
      </Link>
      <Link to="/dietitian/posts" as={ReactLink}>
        <Button
          w="16"
          h="16"
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsFillChatRightTextFill size="30px" />
          <Text mt={1}>快訊</Text>
        </Button>
      </Link>
    </>
  );
}
