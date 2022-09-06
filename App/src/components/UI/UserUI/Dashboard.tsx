import { Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Banner from "../Banner";
import UserNav from "./User_Nav";

export default function DashBoard() {
  return (
    <>
      <Banner />
      <Container
        minW="100%"
        p="0"
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
      >
        <UserNav />
        <Flex
          direction="row"
          height="90vh"
          maxW="90vw"
          flex="8"
          p="2"
          borderRadius="2xl"
          boxShadow="0px 0px 5px 3px"
          flexWrap={"wrap"}
          overflow={"scroll"}
        >
          <Outlet />
        </Flex>
      </Container>
    </>
  );
}
