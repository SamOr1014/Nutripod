import { Container, Flex, useMediaQuery, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { IRootState } from "../../../redux/store";

import Banner from "../Banner";
import UserNav from "./User_Nav";

export default function DashBoard() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();
  const toast = useToast();
  const user = useSelector((state: IRootState) => state.user.user);

  useEffect(() => {
    if (user[0].id === (undefined || null)) {
      navigate("/login");
    }

    toast({
      position: "bottom",
      title: `${user[0].username}`,
      description: "歡迎回來",
      duration: 2000,
      isClosable: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Banner />
      <Container
        minW={"100%"}
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
          flexWrap={"wrap"}
          maxW={"1500px"}
          maxH={isSmallerThan600 ? "100%" : "850px"}
          justifyContent={"center"}
        >
          <Outlet />
        </Flex>
      </Container>
    </>
  );
}
