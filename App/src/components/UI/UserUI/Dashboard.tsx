import { Container, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { IRootState } from "../../../redux/store";

import Banner from "../Banner";
import UserNav from "./User_Nav";
import UserNavLinks from "./User_nav_links";

export default function DashBoard() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const user = useSelector((state: IRootState) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user[0].id === (undefined || null)) {
      navigate("/login");
    }
  }, [user]);
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
          overflow={"auto"}
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
