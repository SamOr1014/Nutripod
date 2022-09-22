import {
  Text,
  Divider,
  Button,
  Flex,
  FormControl,
  Heading,
  Stack,
  useColorModeValue,
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

const { REACT_APP_API_SERVER } = process.env;

export default function DietitianAccount() {
  // obtain data from redux
  //   const navigate = useNavigate();
  const user = useSelector((state: IRootState) => state.user.user);

  const dietitianID = useSelector(
    (state: IRootState) => state.user.dietitian[0].id
  );

  const dietitianEmail = useSelector(
    (state: IRootState) => state.user.dietitian[0].email
  );
  const dietitianUserName = useSelector(
    (state: IRootState) => state.user.dietitian[0].username
  );
  const dietitianFirstName = useSelector(
    (state: IRootState) => state.user.dietitian[0].first_name
  );
  const dietitianLastName = useSelector(
    (state: IRootState) => state.user.dietitian[0].last_name
  );

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
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info/dietitianEmail`,
          {
            id: dietitianID,
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
        }
      }
    });
  }

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
                {dietitianUserName}
              </Text>
            </FormControl>

            <FormControl id="userName">
              <Heading fontSize="lg">姓名</Heading>
              <Text fontSize="xl" my="1">
                {dietitianFirstName + dietitianLastName!}
              </Text>
            </FormControl>

            <FormControl id="email">
              <Heading fontSize="lg">電郵</Heading>
              <Text fontSize="xl" my="1">
                {dietitianEmail}
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

            <Button colorScheme="red" maxWidth={20} m={3}>
              更改密碼?
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
