import { Box, Divider, Flex, Heading } from "@chakra-ui/react";

export default function UserPost() {
  return (
    <>
      <Flex
        border={"2px"}
        minW="50%"
        maxW="100%"
        p={5}
        flexDir="column"
        flexWrap={"wrap"}
      >
        <Heading w={"100%"} textAlign={"center"}>
          健康快訊
          <Divider my={5} />
        </Heading>
        {/* Post Area */}
        <Box borderRadius="lg" overflow="hidden" w={"100%"} borderWidth="1px">
          <Heading fontSize={"2xl"}>Title</Heading>
          <Heading fontSize={"2xl"}>Title</Heading>
        </Box>
      </Flex>
      <Flex border={"2px"} minW="50%" maxW="100%" p={5}>
        2
      </Flex>
    </>
  );
}
