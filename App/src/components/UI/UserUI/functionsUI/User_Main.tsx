import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdToday } from "react-icons/md";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
const css = `
.my-selected:not([disabled]) { 
  font-weight: bold; 
  border: 2px solid currentColor;
}
.my-selected:hover:not([disabled]) { 
  border-color: red;
  color: red;
}
.my-today { 
  font-weight: bold;
  font-size: 100%; 
  color: red;
}
`;

export default function UserMain() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <>
      <style>{css}</style>
      <Flex alignSelf={"center"} justifyContent={"center"} w="100%">
        <Popover>
          <PopoverTrigger>
            <Box as="button" fontSize={"4xl"} fontWeight={"extrabold"}>
              {selectedDate?.toLocaleDateString()} 📅
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontSize={"3xL"} display={"flex"}>
              <Text>請選擇想查看的日期</Text>
            </PopoverHeader>
            <PopoverBody>
              <Flex justifyContent={"center"} mb={-6}>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  defaultMonth={new Date()}
                  modifiersClassNames={{
                    selected: "my-selected",
                    today: "my-today",
                  }}
                  required={true}
                  fixedWeeks
                />
              </Flex>
              <Button
                onClick={() => setSelectedDate(new Date())}
                display={"flex"}
                flexDir={"column"}
              >
                <MdToday />
                今日
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Flex
        flexWrap={"wrap"}
        w={"100%"}
        justifyContent={isSmallerThan600 ? "center" : "space-between"}
        gap={2}
        mb={2}
      >
        <Flex
          flexDir={"column"}
          p={4}
          borderRadius={"3xl"}
          bg={"gray.500"}
          minW={isLargerThan1700 ? "47%" : isSmallerThan600 ? "100%" : "570px"}
          minH={isLargerThan1700 ? "400px" : "150px"}
        >
          <Heading textAlign={"center"}>攝取統計📊</Heading>
          <Divider my={3} />
          <Center flex={1} justifyContent={"center"}>
            <StatGroup flex={"1 1 0%"}>
              <Stat textAlign={"center"}>
                <StatLabel>今日攝取量📈</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比昨日
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat textAlign={"center"}>
                <StatLabel>本月平均攝取量📈</StatLabel>
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
        <Flex
          flexDir={"column"}
          p={4}
          borderRadius={"3xl"}
          bg={"gray.500"}
          minW={isLargerThan1700 ? "47%" : isSmallerThan600 ? "100%" : "570px"}
          minH={isLargerThan1700 ? "400px" : "150px"}
        >
          <Heading textAlign={"center"}>運動統計🏃🏻‍♀️</Heading>
          <Divider my={3} />
          <Center flex={1} justifyContent={"center"}>
            <StatGroup flex={"1 1 0%"}>
              <Stat textAlign={"center"}>
                <StatLabel>今日運動消耗量📈</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比昨日
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat textAlign={"center"}>
                <StatLabel>平均每日運動消耗量📈</StatLabel>
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
      <Divider mb={2} />
      <Flex
        flexWrap={"wrap"}
        w={"100%"}
        gap={2}
        justifyContent={isSmallerThan600 ? "center" : "space-between"}
      >
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "sm" : "2xs"}
          h={isSmallerThan600 ? "2xs" : isLargerThan1700 ? "sm" : "2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Heading>早餐</Heading>
          <Text fontSize={"xl"}>500kcal</Text>
        </Box>
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "sm" : "2xs"}
          h={isSmallerThan600 ? "2xs" : isLargerThan1700 ? "sm" : "2xs"}
          justifyContent={"center"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Heading>午餐</Heading>
          <Text fontSize={"xl"}>500kcal</Text>
        </Box>
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "sm" : "2xs"}
          h={isSmallerThan600 ? "2xs" : isLargerThan1700 ? "sm" : "2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Heading>晚餐</Heading>
          <Text fontSize={"xl"}>500kcal</Text>
        </Box>
        <Box
          display={"flex"}
          rounded={"3xl"}
          alignItems={"center"}
          justifyContent={"center"}
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "sm" : "2xs"}
          h={isSmallerThan600 ? "2xs" : isLargerThan1700 ? "sm" : "2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Heading>小食</Heading>
          <Text fontSize={"xl"}>500kcal</Text>
        </Box>
      </Flex>
    </>
  );
}
