import { Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Banner from "../Banner";
import DietitianNav from "./Dietitian_Nav";

export default function DashBoardDietitian() {
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
        <DietitianNav />
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
