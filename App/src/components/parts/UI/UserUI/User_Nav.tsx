import { Hide, VStack, Button, Text } from "@chakra-ui/react";
import {
  BsFillHouseFill,
  BsTable,
  BsFillChatRightTextFill,
  BsArchiveFill,
  BsFillFileMedicalFill,
} from "react-icons/bs";
import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import UserNavLinks from "./User_nav_links";

export default function UserNav() {
  function CollapsedNav() {
    return (
      <>
        <Hide below="md">
          <VStack
            direction="column"
            width="120px"
            maxH="100%"
            spacing="5"
            p="2"
          >
            <UserNavLinks />
          </VStack>
        </Hide>
      </>
    );
  }

  return <CollapsedNav />;
}
