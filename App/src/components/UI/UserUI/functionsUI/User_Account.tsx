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
    const { value: name } = await Swal.fire({
      title: "請輸入你的姓名",
      input: "text",
    });

    if (name) {
      Swal.fire(`你的姓名已更改為 ${name}`);
    }
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
  async function changeMobile() {
    const { value: mobile } = await Swal.fire({
      title: "請輸入你的電話號碼",
      input: "text",
      inputLabel: "+852",
    });

    if (mobile) {
      Swal.fire(`你的電話號碼已更改為: ${mobile}`);
    }
  }

  async function changeEmail() {
    const email = await Swal.fire({
      title: "請輸入你的電郵",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("ok");
        console.log(result.value);
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info`,
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
          Swal.fire("Success");
          navigate("/dashboard/account");
        } else {
          Swal.fire("Fail");
        }
      } else if (result.isDenied) {
        Swal.fire("Fail");
      }
    });

    // if (email) {
    //   Swal.fire(`你的電郵已更改為: ${email}`);
    // }
  }

  async function fetchUserInfo() {
    const { data } = await axios.get(
      `${REACT_APP_API_SERVER}/user/login/${user[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      }
    );
    console.log(data);
  }
  useEffect(() => {
    fetchUserInfo();
  });

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
          <Text size="md">{userFirstName + userLastName!}</Text>

          <Button
            colorScheme="red"
            onClick={async () => {
              await changeName();
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
          <Text size="md">{userGender}</Text>

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
            onClick={() => {
              changeMobile();
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

          <Button colorScheme="red">更改</Button>
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
