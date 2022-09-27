import { Container, Flex, useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Banner from "../Banner";
import DietitianNav from "./Dietitian_Nav";

export default function DashBoardDietitian() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
  return (
    <>
      <Banner />
      <Container
        minW={"100%"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
      >
        <DietitianNav />
        <Flex
          height="88vh"
          flex="8"
          p="2"
          borderRadius="2xl"
          overflow={"auto"}
          flexWrap={"wrap"}
          maxW={"1500px"}
          maxH={isSmallerThan600 ? "100%" : isLargerThan1700 ? "68vh" : "850px"}
          justifyContent={"center"}
        >
          <Outlet />
        </Flex>
      </Container>
    </>
  );
}
