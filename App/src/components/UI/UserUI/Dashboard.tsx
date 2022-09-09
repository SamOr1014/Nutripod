import { Center, Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Banner from "../Banner";
import UserNav from "./User_Nav";

export default function DashBoard() {
  return (
    <>
      <Banner />
      <Container
        minW={"92vw"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
      >
        <UserNav />
        <Flex
          height="88vh"
          flex="8"
          p="2"
          borderRadius="2xl"
          overflow={"auto"}
          flexWrap={"wrap"}
          maxW={"1500px"}
          maxH={"850px"}
          justifyContent={"center"}
        >
          <Outlet />
        </Flex>
      </Container>
    </>
  );
}
