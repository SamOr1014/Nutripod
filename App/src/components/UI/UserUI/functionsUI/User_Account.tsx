import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";

export default function UserAccount() {
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
          <Box p="2">
            <Heading size="xl">你的帳戶資料</Heading>

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
          <Text size="md">Peter</Text>

          <Button colorScheme="red">更改</Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">性別</Text>
          <Text size="md">男</Text>

          <Button colorScheme="red">更改</Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">出生日期</Text>
          <Text size="md">1991年</Text>

          <Button colorScheme="red">更改</Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">電話號碼</Text>
          <Text size="md">66556655</Text>

          <Button colorScheme="red">更改</Button>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">地址</Text>
          <Text size="md">新界荃灣one mid town 5樓16室 </Text>

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
          <Text size="md">peter123@gmail.com</Text>

          <Button colorScheme="red">更改</Button>
        </Flex>
        <Button colorScheme="red" maxWidth={20} m={3} >更改密碼?</Button>
      </Flex>
    </>
  );
}
