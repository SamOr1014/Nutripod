import { Box, Flex, Heading, Button, Text, Divider } from "@chakra-ui/react";
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

  async function changeName() {
    await Swal.fire({
      title: "請輸入新的用戶名",
      input: "text",
      showCloseButton: true,
      showCancelButton: true,
      // inputAttributes: {
      //   minlength: "1",
      // },
      // inputValidator: () => {
      //   return "請輸入新的用戶名";
      // },
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info/username`,
          {
            id: userID,
            username: result.value,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        );
        console.log(results);
        if (results.data.success) {
          Swal.fire(`你的用戶名已更改為:${result.value}`);
        }
      }
    });
  }

  async function changeGender() {
    const { value: gender } = await Swal.fire({
      title: "Select color",
      input: "radio",
      inputOptions: { 男性: "男性", 女性: "女性", 其他: "其他" },
    });

    if (gender) {
      Swal.fire({ html: `你的性別已更改為 ${gender}` });
    }
  }

  async function changeBirthday() {
    const { value: birthday } = await Swal.fire({
      title: "請輸入你的出生日期",
      input: "text",
      inputLabel: "你的出生日期",
      inputPlaceholder: "年/月/日",
    });

    if (birthday) {
      Swal.fire(`你的出生日期已更改為: ${birthday}`);
    }
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
        //   } else {
        //     Swal.fire("Fail");
        //   }
        // } else if (result.isDenied) {
        //   Swal.fire("Fail");
        // }
      }
    });
  }

  return (
    <>
      <Flex
        display={"flex"}
        flexDir={"column"}
        bg={"gray.500"}
        width="100%"
        h="100%"
        borderRadius={10}
      >
        <Flex
          minWidth="max-content"
          alignItems="center"
          m={3}
          justifyContent={"center"}
        >
          <Box p="2" textAlign={"center"}>
            <Heading size="xl">你的帳戶資料</Heading>
            <Divider mb={5} />
            <Text size="md">如你發現你的個人資料有錯誤,請即更改至最新狀況</Text>
          </Box>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">姓名</Text>
          <Text size="md">{userName}</Text>

          <Button
            colorScheme="red"
            onClick={async () => {
              changeName();
            }}
          >
            更改
          </Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">性別</Text>
          {userGender === 1 ? (
            <Text size="md">男性</Text>
          ) : (
            <Text size="md">女性</Text>
          )}

          <Button
            colorScheme="red"
            onClick={async () => {
              changeGender();
            }}
          >
            更改
          </Button>
        </Flex>

        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">出生日期</Text>
          <Text size="md">
            {userBirthday ? new Date(userBirthday).toLocaleDateString() : ""}
          </Text>

          <Button
            colorScheme="red"
            onClick={async () => {
              changeBirthday();
            }}
          >
            更改
          </Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">電話號碼</Text>
          <Text size="md">+852 {userPhone}</Text>

          <Button
            colorScheme="red"
            onClick={async () => {
              changePhone();
            }}
          >
            更改
          </Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">地址</Text>
          <Text size="md">{userAddress}</Text>

          <Button
            colorScheme="red"
            onClick={async () => {
              changeAddress();
            }}
          >
            更改
          </Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">電郵</Text>
          <Text size="md">{userEmail}</Text>

          <Button
            colorScheme="red"
            onClick={async () => {
              changeEmail();
            }}
          >
            更改
          </Button>
        </Flex>
        <Button colorScheme="red" maxWidth={20} m={3}>
          更改密碼?
        </Button>
      </Flex>
    </>
  );
}
