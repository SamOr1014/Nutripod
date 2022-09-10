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
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import UserNavLinks from "./UserUI/User_nav_links";

export default function Banner() {
  const { toggleColorMode } = useColorMode();
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
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
    <Center
      height={isLargerThan1700 ? 40 : 14}
      p={"10"}
      boxShadow={"5px 2px 10px 3px black"}
      mb={isLargerThan1700 ? 10 : 2}
      pos={"sticky"}
      top={0}
    >
      <Center flex="2" display="flex" justifyContent="start">
        <Show above="md"></Show>
        <Hide above="1200px">
          <Button size="sm" onClick={onDrawerOpen}>
            <HamburgerIcon />
          </Button>
        </Hide>
      </Center>
      <Center flex="8">
        <Text fontSize={isLargerThan1700 ? "6xl" : "2xl"} as="b">
          NutriPOD
        </Text>
      </Center>
      <Center flex="2" justifyContent="end" flexDirection="row">
        <Show above="md">
          <Text
            mx={4}
            fontSize={isLargerThan1700 ? "xl" : "md"}
            fontWeight="extrabold"
          >
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
            <MenuItem
              fontWeight="bold"
              fontSize={isLargerThan1700 ? "xl" : "md"}
            >
              外觀：
              <Switch
                marginRight="1"
                size="md"
                onChange={() => toggleColorMode()}
              />
            </MenuItem>
            <Link as={ReactLink} to={accountDir}>
              <MenuItem
                fontWeight="bold"
                fontSize={isLargerThan1700 ? "xl" : "md"}
              >
                帳戶
              </MenuItem>
            </Link>

            <Link as={ReactLink} to="/api/logout">
              <MenuItem
                fontWeight="bold"
                fontSize={isLargerThan1700 ? "xl" : "md"}
              >
                登出
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Center>
      <MobileNav />
    </Center>
  );
}
