import { Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Banner from "../Banner";
import UserNav from "./UserNav";

export default function DashBoard() {
  const [navExtend, setNavExtend] = useState<boolean>(false);
  return (
    <>
      <Banner />
      <Container maxW="100%" p="0" display="flex" flexDirection="row">
        <UserNav />
        <Flex direction="column" height="90vh" flex="8" p="2">
          <Flex boxShadow="3px 3px 10px" borderRadius="2xl" flex="1" p="4">
            <Outlet />
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
