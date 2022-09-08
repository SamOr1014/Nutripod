import { Center, Container } from "@chakra-ui/react";
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
        <Center
          height="84vh"
          flex="8"
          p="2"
          borderRadius="2xl"
          flexWrap={"wrap"}
          overflow={"auto"}
        >
          <Outlet />
        </Center>
      </Container>
    </>
  );
}
