import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Link,
  Image,
  InputGroup,
  InputRightElement,
  Switch,
  Spinner,
  useMediaQuery,
  useBoolean,
  Stack,
  Center,
  useColorMode,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../redux/store";
import { loginThunk } from "../redux/Thunk/AuthThunk";
import { tokenThunk } from "../redux/Thunk/tokenThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter } from "react-icons/fa";

export function Login() {
  const bg = useColorModeValue("gray.200", "gray.700");
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [saveUser, setSaveUser] = useBoolean(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state: IRootState) => state.user.loading);
  const [isSmallerThan600] = useMediaQuery("(max-width: 800px)");
  const { toggleColorMode } = useColorMode();
  const checkToken = window.localStorage.getItem("userLocalToken");

  const TokenLogin = async () => {
    const result = await dispatch(tokenThunk(checkToken as string));
    if (result.payload.success) {
      const userInfo = result.payload.data;
      if (userInfo.is_user === true) {
        navigate("/dashboard");
      } else if (userInfo.is_user === false) {
        navigate("/dietitian");
      }
    }
  };

  if (checkToken != null) {
    TokenLogin();
  }

  const LoginSubmit = async () => {
    let info = {
      username: username,
      password: userPassword,
      saveLoggedIn: saveUser,
    };

    const result = await dispatch(loginThunk(info));
    if (result.payload.success) {
      const userInfo = result.payload.data;
      if (userInfo.is_user === true) {
        navigate("/dashboard");
      } else if (userInfo.is_user === false) {
        navigate("/dietitian");
      }
    }
  };

  if (loadingStatus) {
    return (
      <Center w={"100%"} h={"100%"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  const userNameError = username === " ";

  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderBottom="2px"
        borderColor="blackAlpha.300"
      >
        <Link as={ReactLink} to="/">
          <Center>
            {" "}
            <Image
              src="logo.png"
              boxSize="150px"
              objectFit="fill"
              mt="1"
            ></Image>
          </Center>
        </Link>

        <FormLabel fontSize="2xl" fontWeight="bold">
          NutriPOD
        </FormLabel>
      </Box>

      <Box
        height="100%"
        width={isSmallerThan600 ? "100%" : "40%"}
        mt={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderColor="blackAlpha.400"
        boxShadow="dark-lg"
        p="2"
        rounded="md"
        bg="white"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            LoginSubmit();
          }}
        >
          <Box bg={bg} padding="50px" rounded="md">
            <FormLabel>用戶名稱</FormLabel>
            <FormControl
              variant="floating"
              id="userName"
              isRequired
              isInvalid={userNameError}
            >
              <Input
                placeholder="用戶名"
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              {!userNameError ? (
                <FormHelperText fontWeight="bold">
                  請用用戶名稱登入
                </FormHelperText>
              ) : (
                <FormErrorMessage>Invalid input</FormErrorMessage>
              )}
            </FormControl>

            <FormLabel mt="4">密碼</FormLabel>

            <InputGroup size="md">
              <Input
                pr="5rem"
                type={show ? "text" : "password"}
                placeholder="密碼"
                isRequired
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" onClick={handleClick}>
                  {show ? (
                    <FontAwesomeIcon icon={solid("eye-slash")} />
                  ) : (
                    <FontAwesomeIcon icon={solid("eye")} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>

            <ButtonGroup display="flex" justifyContent="center">
              <Button
                width="80%"
                mt="6"
                bg="messenger.500"
                colorScheme="blackAlpha"
                type="submit"
              >
                登入
              </Button>
            </ButtonGroup>

            <Flex
              flexWrap="wrap"
              gap={isSmallerThan600 ? "25px" : "20%"}
              flexDirection={isSmallerThan600 ? "column" : "row"}
              justifyContent={isSmallerThan600 ? "center" : "space-evenly"}
              mt="6"
            >
              <Center>
                <Switch
                  mx={2}
                  id="save-user"
                  alignSelf="center"
                  onChange={setSaveUser.toggle}
                />

                <FormLabel
                  htmlFor="save-user"
                  fontSize="20px"
                  onChange={setSaveUser.toggle}
                  mt={2}
                >
                  保持登入
                </FormLabel>
              </Center>
              <Center>
                <MdDarkMode size={"2em"} />
                <Text fontSize="20px">外觀</Text>
                <Switch
                  marginRight="1"
                  size="md"
                  onChange={() => toggleColorMode()}
                  mx={3}
                />
              </Center>
              <Link
                as={ReactLink}
                to="/"
                fontSize="large"
                color="blackAlpha.800"
                display="flex"
                justifyContent="center"
                alignItems={"center"}
              >
                忘記密碼？
              </Link>
            </Flex>
          </Box>
        </form>
      </Box>

      <Box
        h="100%"
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        borderTop="2px"
        borderColor="blackAlpha.400"
        mt="6"
      >
        <FormLabel
          fontSize={isSmallerThan600 ? "2xl" : "3xl"}
          alignSelf="center"
          mt="5"
        >
          {" "}
          想加入NutriPOD?
        </FormLabel>

        <Stack
          display="flex"
          justifyContent="center"
          direction="row"
          w={isSmallerThan600 ? "10%" : "100%"}
          gap="2"
          mt="2"
          flexWrap={"wrap"}
        >
          <Link as={ReactLink} to="/">
            <Button
              leftIcon={<EmailIcon />}
              colorScheme="teal"
              variant="solid"
              w={"32"}
            >
              電郵
            </Button>
          </Link>

          <Link href="https://www.facebook.com/" isExternal>
            <Button colorScheme="facebook" leftIcon={<FaFacebook />} w={"32"}>
              Facebook
            </Button>
          </Link>

          <Link href="https://twitter.com/" isExternal>
            <Button colorScheme="twitter" leftIcon={<FaTwitter />} w={"32"}>
              Twitter
            </Button>
          </Link>

          <Link as={ReactLink} to="/">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              w={"32"}
            >
              聯絡我們
            </Button>
          </Link>
        </Stack>

        <Link
          as={ReactLink}
          to="/"
          fontSize="large"
          display="flex"
          justifyContent="center"
          mt="5"
        >
          {`Terms of Use & Privacy Policy`}
        </Link>
      </Box>
    </Box>
  );
}
