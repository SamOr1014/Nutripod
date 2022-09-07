import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
export default function UserMain() {
  return (
    <>
      <Flex alignSelf={"center"} justifyContent={"center"} w="100%" p={2}>
        <Box>Time Here</Box>
      </Flex>
      <Flex
        flexWrap={"wrap"}
        w={"100%"}
        justifyContent={"center"}
        gap={2}
        mb={15}
        borderRadius={"3xl"}
        bg={"gray.700"}
      >
        <Flex w={"xl"} flexDir={"column"} p={4}>
          <Heading textAlign={"center"}>攝取統計</Heading>
          <Divider my={3} />
          <Center flex={1} justifyContent={"center"}>
            <StatGroup flex={"1 1 0%"}>
              <Stat textAlign={"center"}>
                <StatLabel>今日攝取量</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比昨日
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat textAlign={"center"}>
                <StatLabel>本月平均攝取量</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比上月
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Center>
        </Flex>
        <Flex w={"xl"} flexDir={"column"} p={4}>
          <Heading textAlign={"center"} mb={2}>
            運動統計
          </Heading>
          <Divider my={3} />
          <Center flex={1} justifyContent={"center"}>
            <StatGroup flex={"1 1 0%"}>
              <Stat textAlign={"center"}>
                <StatLabel>今日運動消耗量</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比昨日
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat textAlign={"center"}>
                <StatLabel>平均每日運動消耗量</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比今日
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Center>
        </Flex>
      </Flex>
      <Flex
        flexWrap={"wrap"}
        w={"100%"}
        gap={"5"}
        justifyContent={"space-around"}
        h={"40%"}
      >
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"2xs"}
          h={"2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.700"}
        >
          <Heading>早餐</Heading>
        </Box>
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          w={"2xs"}
          h={"2xs"}
          justifyContent={"center"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.700"}
        >
          <Heading>午餐</Heading>
        </Box>
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"2xs"}
          h={"2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.700"}
        >
          <Heading>晚餐</Heading>
        </Box>
        <Box
          display={"flex"}
          rounded={"3xl"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"2xs"}
          h={"2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.700"}
        >
          <Heading>小食</Heading>
        </Box>
      </Flex>
    </>
  );
}
