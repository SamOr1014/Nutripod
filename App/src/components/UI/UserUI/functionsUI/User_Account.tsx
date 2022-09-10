import { Box, Flex, Spacer, Heading, Button, Text } from "@chakra-ui/react";

export default function UserAccount() {
  return (
    <>
      <Flex
        display={"flex"}
        flexDir={"column"}
        bg={"gray.500"}
        width="100%"
        h="100%"
      >
        <Flex
          minWidth="max-content"
          alignItems="center"
          m={3}
          justifyContent={"center"}
        >
          <Box p="2">
            <Heading size="xl">你的帳戶</Heading>

            <Spacer />
          </Box>
        </Flex>
        <Flex
          minWidth="max-content"
          alignItems="center"
          bg={"green"}
          m={3}
          justifyContent="space-between"
        >
          <Text size="md">Name</Text>
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
          <Text size="md">1/1/1991</Text>

          <Button colorScheme="red">更改</Button>
        </Flex>
      </Flex>
    </>
  );
}
