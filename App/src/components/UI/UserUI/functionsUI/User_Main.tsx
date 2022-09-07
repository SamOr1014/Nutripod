import { Box, Flex, Heading } from "@chakra-ui/react";
export default function UserMain() {
  return (
    <>
      <Flex flexWrap={"wrap"} w={"100%"} justifyContent={"center"} gap={"5"}>
        <Box
          flex={1}
          border={"8px"}
          width={{ base: "100%", sm: "50%", md: "25%" }}
        >
          Hi Stranger, This is your Calories intake today!
        </Box>
        <Box
          flex={1}
          border={"8px"}
          width={{ base: "100%", sm: "50%", md: "25%" }}
        >
          Hi Stranger, This is your Calories burn by exercise today!
        </Box>
      </Flex>
      <Flex flexWrap={"wrap"} w={"100%"} gap={"5"} justifyContent={"center"}>
        <Box
          border={"8px"}
          rounded={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"40"}
          h={"40"}
        >
          <Heading>早餐</Heading>
        </Box>
        <Box
          border={"8px"}
          rounded={"full"}
          display={"flex"}
          alignItems={"center"}
          w={"40"}
          h={"40"}
          justifyContent={"center"}
        >
          <Heading>早餐</Heading>
        </Box>
        <Box
          border={"8px"}
          rounded={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"40"}
          h={"40"}
        >
          <Heading>早餐</Heading>
        </Box>
        <Box
          border={"8px"}
          rounded={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"40"}
          h={"40"}
        >
          <Heading>早餐</Heading>
        </Box>
      </Flex>
    </>
  );
}
