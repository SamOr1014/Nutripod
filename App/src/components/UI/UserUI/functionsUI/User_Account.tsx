import {
  Box,
  Text,
  Divider,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IRootState } from "../../../../redux/store";
import axios from "axios";
import locateToken from "../../../../utility/Token";
import { useNavigate } from "react-router";

const { REACT_APP_API_SERVER } = process.env;

export default function UserAccount() {
  // obtain data from redux
  const navigate = useNavigate();
  const user = useSelector((state: IRootState) => state.user.user);

  const userID = useSelector((state: IRootState) => state.user.user[0].id);

  const userHKID = useSelector((state: IRootState) => state.user.user[0].HKID);

  const userEmail = useSelector(
    (state: IRootState) => state.user.user[0].email
  );
  const userName = useSelector(
    (state: IRootState) => state.user.user[0].username
  );
  const userFirstName = useSelector(
    (state: IRootState) => state.user.user[0].first_name
  );
  const userLastName = useSelector(
    (state: IRootState) => state.user.user[0].last_name
  );
  const userGender = useSelector(
    (state: IRootState) => state.user.user[0].gender
  );

  const userPhone = useSelector(
    (state: IRootState) => state.user.user[0].phone
  );
  const userBirthday = useSelector(
    (state: IRootState) => state.user.user[0].birthday
  );
  const userAddress = useSelector(
    (state: IRootState) => state.user.user[0].address
  );

  const saveToken = useSelector((state: IRootState) => state.user.saveToken);

  const [noInput, setNoInput] = useState<string>("");

  async function changeGender() {
    await Swal.fire({
      title: "請選擇",
      input: "radio",
      inputOptions: { 1: "男性", 2: "女性", 3: "其他" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info/gender`,
          {
            id: userID,
            gender: result.value,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        );
        if (results.data.success) {
          Swal.fire(`你的性別已更改為: ${result.value}`);
        }
      }
    });
  }

  async function changePhone() {
    await Swal.fire({
      title: "請輸入你的電話號碼",
      input: "text",
      inputLabel: "+852",
      inputPlaceholder: "98765432",
      showCloseButton: true,
      showCancelButton: true,
      inputAttributes: {
        minlength: "8",
        maxlength: "8",
        isInteger: "true",
      },
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed && result.value.length === 8) {
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info/phone`,
          {
            id: userID,
            phone: result.value,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        );
        console.log(results);
        if (results.data.success) {
          Swal.fire(`你的電話號碼已更改為: +852 ${result.value}`);
        }
      } else if (result.isConfirmed && result.value.length != 8) {
        Swal.fire({
          icon: "error",
          title: "請輸入正確的電話號碼",
        });
      } else if (result.isConfirmed && result.value === isNaN) {
        Swal.fire({
          icon: "error",
          title: "請輸入正確的電話號碼",
        });
      }
    });
  }

  async function changeAddress() {
    await Swal.fire({
      title: "請輸入你的地址",
      input: "text",
      inputLabel: "請提供完整的住址",
      inputPlaceholder: "荃灣祈德尊新村A座25A",
      showCloseButton: true,
      showCancelButton: true,
      inputAttributes: {
        minlength: "8",
      },
      // inputValidator: () => {
      //   return "請輸入完整的住址";
      // },
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info/address`,
          {
            id: userID,
            address: result.value,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        );
        if (results.data.success) {
          Swal.fire(`你的地址已更改為:${result.value}`);
        }
      }
    });
  }

  async function changeEmail() {
    await Swal.fire({
      title: "請輸入你的電郵",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "abc@example.com",
      showCloseButton: true,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info/email`,
          {
            id: userID,
            email: result.value,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        );
        if (results.data.success) {
          Swal.fire(`你的電郵已更改為: ${result.value}`);
          // navigate("/dashboard/account");
        }
      }
    });
  }
  // useEffect(() => {
  //   if (user[0].id) {
  //     changePhone();
  //   }
  // }, [user]);

  return (
    <>
      <Flex
        display={"flex"}
        flexDir={"column"}
        width="100%"
        h="100%"
        borderRadius={10}
      >
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              你的用戶資料
              <Divider mb={2} />
            </Heading>
            <FormControl id="userIcon">
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">更換頭像</Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="userName">
              <Heading fontSize="lg">用戶名稱</Heading>
              <Text fontSize="xl" my="1">
                {userName}
              </Text>
            </FormControl>
            <FormControl id="gender">
              <Heading fontSize="lg">性別</Heading>
              <Text fontSize="xl" my="1">
                {userGender === 1 ? (
                  <Text size="md">男性</Text>
                ) : (
                  <Text size="md">女性</Text>
                )}
              </Text>
              <Button
                colorScheme="red"
                onClick={async () => {
                  changeGender();
                }}
              >
                更改
              </Button>
            </FormControl>
            <FormControl id="phone">
              <Heading fontSize="lg">電話號碼</Heading>
              <Text fontSize="xl" my="1">
                +852 {userPhone}
              </Text>
              <Button
                colorScheme="red"
                onClick={async () => {
                  changePhone();
                }}
              >
                更改
              </Button>
            </FormControl>
            <FormControl id="email">
              <Heading fontSize="lg">電郵</Heading>
              <Text fontSize="xl" my="1">
                {userEmail}
              </Text>
              <Button
                colorScheme="red"
                onClick={async () => {
                  changeEmail();
                }}
              >
                更改
              </Button>
            </FormControl>
            <FormControl id="address">
              <Heading fontSize="lg">地址</Heading>
              <Text fontSize="xl" my="1">
                {userAddress}
              </Text>
              <Button
                colorScheme="red"
                onClick={async () => {
                  changeAddress();
                }}
              >
                更改
              </Button>
            </FormControl>
            <Button colorScheme="red" maxWidth={20} m={3}>
              更改密碼?
            </Button>
          </Stack>
        </Flex>

        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              基本個人資料
              <Divider mb={2} />
            </Heading>
            <Text fontSize="md">如你發現你的個人資料有錯誤,請立即通知我們</Text>

            <FormControl id="userRealName">
              <Heading fontSize="lg">姓名</Heading>
              <Text fontSize="xl" my="1">
                {userFirstName + userLastName!}
              </Text>
            </FormControl>
            <FormControl id="hkid">
              <Heading fontSize="lg">身份證號碼</Heading>
              <Text fontSize="xl" my="1">
                {userHKID?.slice(0, 7) + "("}
                {userHKID?.slice(-1) + ")"}
              </Text>
            </FormControl>
            <FormControl id="birthday">
              <Heading fontSize="lg">出生日期</Heading>
              <Text fontSize="xl" my="1">
                {userBirthday
                  ? new Date(userBirthday).toLocaleDateString()
                  : ""}
              </Text>
            </FormControl>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
