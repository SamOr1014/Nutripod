import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Center,
  Show,
  Button,
  Switch,
  useColorMode,
  Text,
  Hide,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import UserNavLinks from "./UserUI/User_nav_links";

export default function Banner() {
  const { toggleColorMode } = useColorMode();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  // If the role is dietitian render a different route for account
  const accountDir = "/dashboard/account";
  //   state.role === "dietitian" ? "/dietitian/account" : "/dashboard/account";

  function MobileNav() {
    return (
      <Drawer placement="top" onClose={onDrawerClose} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Center flex="8">
              <Text>NutriPOD</Text>
            </Center>
          </DrawerHeader>
          <DrawerBody>
            <Center>
              {/* If the role is dietitian render a different mobile nav */}
              <UserNavLinks closeDrawer={onDrawerClose} />
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Center height="14" p={"10"} boxShadow={"5px 2px 10px 3px black"}>
      <Center flex="2" display="flex" justifyContent="start">
        <Show above="md"></Show>
        <Hide above="1200px">
          <Button size="sm" onClick={onDrawerOpen}>
            <HamburgerIcon />
          </Button>
        </Hide>
      </Center>
      <Center flex="8">
        <Text fontSize="2xl" as="b">
          NutriPOD
        </Text>
      </Center>
      <Center flex="2" justifyContent="end" flexDirection="row">
        <Show above="md">
          <Text mx={4} fontSize="md" fontWeight="extrabold">
            你好, Stranger
          </Text>
        </Show>
        <Menu>
          <MenuButton
            p={1}
            w={14}
            h={14}
            rounded="full"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
          >
            <Avatar />
          </MenuButton>
          <MenuList>
            <MenuItem fontWeight="bold">
              外觀：
              <Switch
                marginRight="1"
                size="md"
                onChange={() => toggleColorMode()}
              />
            </MenuItem>
            <Link as={ReactLink} to={accountDir}>
              <MenuItem fontWeight="bold">帳戶</MenuItem>
            </Link>

            <Link as={ReactLink} to="/api/logout">
              <MenuItem fontWeight="bold">登出</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Center>
      <MobileNav />
    </Center>
  );
}
