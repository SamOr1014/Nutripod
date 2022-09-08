import { Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Banner from "../Banner";
import UserNav from "./User_Nav";

export default function DashBoard() {
  return (
    <>
      <Banner />
      <Container
        minW={"90%"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
      >
        <UserNav />
        <Flex
          direction="row"
          height="80vh"
          flex="8"
          p="2"
          borderRadius="2xl"
          flexWrap={"wrap"}
          overflow={"auto"}
        >
          <Outlet />
        </Flex>
      </Container>
    </>
  );
}
