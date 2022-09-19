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
  Text
} from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../redux/store";
import {
  userLogin,
  dietitianLogin,
  userSavedInfo,
  dietitianSavedInfo,
} from "../redux/Slice/AuthSlice";
import { loginThunk } from "../redux/Thunk/AuthThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { token } from "../utility/models"
import jwt_decode from "jwt-decode"
import axios from "axios";

export function Login() {
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
  const { REACT_APP_API_SERVER } = process.env;
  const checkToken = window.localStorage.getItem("userLocalToken")

  const checkTokenLogin = async() => {
    const payload: token = jwt_decode(checkToken as string)

    const result = await axios.post(`${REACT_APP_API_SERVER}/user/checkToken`, {
      data: {
        id: payload.id,
        username: payload.username,
      },
    });
    if (result.data.result.is_user) {
      const userinfo = result.data.result;
      const userData: userSavedInfo = {
        id: userinfo.id,
        username: userinfo.username,
        first_name: userinfo.first_name,
        last_name: userinfo.last_name,
        email: userinfo.email,
        birthday: userinfo.birthday,
        height: userinfo.height,
        weight: userinfo.weight,
        gender: userinfo.gender,
        phone: userinfo.phone,
        address: userinfo.address,
        profession: userinfo.profession,
        HKID: userinfo.hkid,
        chronic_condition: userinfo.chronic_condition,
        education: userinfo.education,
        is_deleted: userinfo.is_deleted,
        is_user: userinfo.is_user,
        saveToken: true,
      };
      dispatch(userLogin(userData));
      navigate("/dashboard");
    } else if (!result.data.result.is_user) {
      const dietitianInfo = result.data.result;
      const dietitianData: dietitianSavedInfo = {
        id: dietitianInfo.id,
        username: dietitianInfo.username,
        first_name: dietitianInfo.first_name,
        last_name: dietitianInfo.last_name,
        email: dietitianInfo.email,
        is_user: dietitianInfo.is_user,
        is_deleted: dietitianInfo.is_deleted,
        saveToken: true,
      };
      dispatch(dietitianLogin(dietitianData));
      navigate("/dietitian");
    }
  };

  if (checkToken != null) {
    checkTokenLogin();
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
        const userData: userSavedInfo = {
          id: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          birthday: userInfo.birthday,
          height: userInfo.height,
          weight: userInfo.weight,
          gender: userInfo.gender,
          phone: userInfo.phone,
          address: userInfo.address,
          profession: userInfo.profession,
          HKID: userInfo.hkid,
          chronic_condition: userInfo.chronic_condition,
          education: userInfo.education,
          is_deleted: userInfo.is_deleted,
          is_user: userInfo.is_user,
          saveToken: saveUser,
        };
        dispatch(userLogin(userData));
        navigate("/dashboard");
      } else if (userInfo.is_user === false) {
        const dietitianData: dietitianSavedInfo = {
          id: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          is_user: userInfo.is_user,
          is_deleted: userInfo.is_deleted,
          saveToken: saveUser,
        };
        dispatch(dietitianLogin(dietitianData));
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
            {
              LoginSubmit();
            }
          }}
        >
          <Box bg="blue.300" padding="50px" rounded="md">
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
          Terms of Use & Privacy Policy
        </Link>
      </Box>
    </Box>
  );
}
