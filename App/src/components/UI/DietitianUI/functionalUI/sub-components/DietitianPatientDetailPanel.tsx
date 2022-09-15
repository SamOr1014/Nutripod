import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Text,
  useMediaQuery,
  Heading,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Center,
  Divider,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { MdToday } from "react-icons/md";
import { DietitianPatientPanel } from "../../../../../utility/models";

export default function DietitianPatientDetailPanel(
  patient: DietitianPatientPanel
) {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  // User Information
  function UserDetailAndBooking() {
    return (
      <Flex
        flexDir={"column"}
        w={isSmallerThan600 ? "100%" : "30%"}
        h={isSmallerThan600 ? "100%" : "530px"}
        fontSize={isSmallerThan600 ? "sm" : "xl"}
        borderRadius={"3xl"}
        bg={"gray.500"}
        p={5}
      >
        <Heading>病人個人資料</Heading>
        <Divider my={3} />
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            用家ID:
          </Text>
          <Text>{patient.id}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            名:
          </Text>
          <Text>{patient.first_name}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            姓:
          </Text>
          <Text>{patient.last_name}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            體重:
          </Text>
          <Text>{patient.weight}kg</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            身高:
          </Text>
          <Text>{patient.height}cm</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            BMI:
          </Text>
          <Text>
            {(patient.weight / (patient.height / 100) ** 2).toPrecision(4)}
          </Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            性別:
          </Text>
          <Text>{patient.gender}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            香港身份證:
          </Text>
          <Text>{patient.HKID}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            電話:
          </Text>
          <Text>{patient.phone}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight={"extrabold"}>
            出生日期:
          </Text>
          <Text>{patient.birthday}</Text>
        </Flex>
      </Flex>
    );
  }

  //All User Medical Record and Booking
  function PatientsBookingAndRecordPanel() {
    return (
      <>
        <Flex
          flexDir={"column"}
          w={isSmallerThan600 ? "100%" : "30%"}
          bg={"gray.500"}
          borderRadius={"3xl"}
          alignItems={"center"}
        >
          <Heading
            textAlign={"center"}
            w={"100%"}
            my={5}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Image
              boxSize={"50px"}
              objectFit={"scale-down"}
              src="https://1.bp.blogspot.com/-FsKd1JB-gCg/X5OcLEtvFTI/AAAAAAABb6M/9PkV67uAPuw-9tp4Rg0AqpmXHJikKcOGQCNcBGAsYHQ/s400/computer_doctor_woman.png"
            />
            病人已預約診期
          </Heading>
          <Flex w={"90%"} maxH={"80%"} overflow={"auto"}>
            <Table size={isSmallerThan600 ? "sm" : "md"}>
              <Thead position="sticky" top={0} bg={"gray.300"} zIndex={100}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th>Dietitian</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>22/9/2022</Td>
                  <Td>09:00</Td>
                  <Td>Gigi Wong</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
        </Flex>

        <Flex
          flexDir={"column"}
          w={isSmallerThan600 ? "100%" : "30%"}
          bg={"gray.500"}
          borderRadius={"3xl"}
          alignItems={"center"}
        >
          <Heading
            textAlign={"center"}
            w={"100%"}
            my={5}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Image
              boxSize={"60px"}
              objectFit={"scale-down"}
              src="https://4.bp.blogspot.com/-xbPNbw-wskQ/WD_cc2HtA-I/AAAAAAABAGg/NxmpkevkdtgfxJg2JUqCQAS3FqWpcfDdgCLcB/s400/enkaku_iryou_man.png"
            />
            病人病歷記錄
          </Heading>
          <Box w={"90%"} maxH={"80%"} overflow={"auto"}>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 1 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>
      </>
    );
  }

  function DietitianUserExerciseAndFoodDetailPanel() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date()
    );
    return (
      <>
        {/* The popover date picker */}
        <Flex alignSelf={"center"} justifyContent={"center"} w="100%" my={-3}>
          <Popover>
            <PopoverTrigger>
              <Box as="button" fontSize={"xl"} fontWeight={"extrabold"}>
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
        {/* The popover date picker end*/}
        {/* The actual panel */}
        <Flex
          w={"100%"}
          h={"99%"}
          flexWrap={"wrap"}
          gap={5}
          justifyContent={"center"}
        >
          <Flex
            w={isSmallerThan600 ? "100%" : "47%"}
            maxH={isSmallerThan600 ? "100%" : "480px"}
            minH={"500px"}
            justifyContent={"center"}
            gap={5}
            flexWrap={"wrap"}
          >
            {/* net kcal */}
            <Flex
              flexDir={"column"}
              borderRadius={"3xl"}
              bg={"gray.500"}
              minW={"100%"}
              maxH={isSmallerThan600 ? "auto" : "45%"}
              p={4}
            >
              <Center flex={1} justifyContent={"center"}>
                <StatGroup flex={"1 1 0%"}>
                  <Stat textAlign={"center"}>
                    <StatLabel justifyContent={"center"} display={"flex"}>
                      <Image
                        boxSize={"50px"}
                        objectFit={"scale-down"}
                        src="https://3.bp.blogspot.com/-DVesu5jkbJY/V-SzHXVJrVI/AAAAAAAA-D8/S2GvFrXsOvMT7IwOjZHsa2VM83Q9LZSVACLcB/s400/syokuji_girl.png"
                      />
                    </StatLabel>
                    <StatLabel>本日攝取量📈</StatLabel>
                    <StatNumber fontSize={isSmallerThan600 ? "md" : "auto"}>
                      345,670kcal
                    </StatNumber>
                    <StatHelpText>
                      比前一日
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </Stat>

                  <Stat textAlign={"center"}>
                    <StatLabel justifyContent={"center"} display={"flex"}>
                      <Image
                        boxSize={"50px"}
                        objectFit={"scale-down"}
                        src="https://4.bp.blogspot.com/-M4s-kw3pnK4/VVGU_vRA5ZI/AAAAAAAAtgc/gurhjQK24X0/s400/diet_after_woman.png"
                      />
                    </StatLabel>
                    <StatLabel>本月平均攝取量📈</StatLabel>
                    <StatNumber fontSize={isSmallerThan600 ? "md" : "auto"}>
                      345,670kcal
                    </StatNumber>
                    <StatHelpText>
                      比上月
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </Center>
            </Flex>
            {/* end of net kcal */}
            {/* exercise panel dietitian */}
            <Flex
              flexDir={"column"}
              bg={"gray.500"}
              maxH={"45%"}
              minH={"500px"}
              w={"100%"}
              borderRadius={"3xl"}
              alignItems={"center"}
              p={3}
            >
              <Heading textAlign={"center"} fontSize={"xl"} mb={1}>
                Exercise
              </Heading>
              <Flex w={"100%"} maxH={"90%"} overflow={"auto"}>
                <Table
                  size={isSmallerThan600 ? "sm" : "md"}
                  maxW={"100%"}
                  fontSize={isSmallerThan600 ? "xs" : "md"}
                >
                  <Thead position="sticky" top={0} bg={"gray.300"} zIndex={1}>
                    <Tr>
                      <Th>日期</Th>
                      <Th>時長(mins)</Th>
                      <Th>運動</Th>
                      <Th>消耗(kcal)</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr>
                      <Td>22/9/2022</Td>
                      <Td>10</Td>
                      <Td>
                        <Text maxH={"50px"} maxW={"150px"} overflow="auto">
                          Runungungugnugngungugnugnguhngdfffffffffffffffffffffffffffffffffffffff
                        </Text>
                      </Td>
                      <Td>237</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
            </Flex>
          </Flex>
          {/* end of exercise panel for dietitian view */}
          <Flex
            w={isSmallerThan600 ? "100%" : "47%"}
            maxH={isSmallerThan600 ? "100%" : "480px"}
            justifyContent={"center"}
            gap={5}
            flexWrap={"wrap"}
            p={1}
          >
            <Flex
              flexDir={"column"}
              w={isSmallerThan600 ? "100%" : "45%"}
              maxH={isSmallerThan600 ? "200px" : "45%"}
              borderRadius={"3xl"}
              bg={"gray.500"}
              alignItems={"center"}
            >
              <Heading textAlign={"center"}>早餐</Heading>
              <Box w={"90%"} maxH={"80%"} overflow={"auto"}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          food + gram
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>nutrition info</AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Flex>
            <Flex
              flexDir={"column"}
              w={isSmallerThan600 ? "100%" : "45%"}
              maxH={isSmallerThan600 ? "100%" : "45%"}
              borderRadius={"3xl"}
              bg={"gray.500"}
              p={1}
              alignItems={"center"}
            >
              <Heading textAlign={"center"}>午餐</Heading>
              <Box w={"90%"} maxH={"80%"} overflow={"auto"}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          food + gram
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>nutrition info</AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Flex>
            <Flex
              flexDir={"column"}
              w={isSmallerThan600 ? "100%" : "45%"}
              borderRadius={"3xl"}
              bg={"gray.500"}
              p={1}
              alignItems={"center"}
            >
              <Heading textAlign={"center"}>晚餐</Heading>
              <Box w={"90%"} maxH={"80%"} overflow={"auto"}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          food + gram
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>nutrition info</AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Flex>
            <Flex
              flexDir={"column"}
              w={isSmallerThan600 ? "100%" : "45%"}
              bg={"gray.500"}
              borderRadius={"3xl"}
              p={1}
              alignItems={"center"}
            >
              <Heading textAlign={"center"}>小食</Heading>
              <Box w={"90%"} maxH={"80%"} overflow={"auto"}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          food + gram
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>nutrition info</AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green" w={"100%"} h={"100%"}>
        <TabList>
          <Tab>病人記錄</Tab>
          <Tab>飲食詳情</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              w={"100%"}
              h={"100%"}
              justifyContent={"center"}
              gap={5}
              flexWrap={"wrap"}
            >
              <UserDetailAndBooking />
              <PatientsBookingAndRecordPanel />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              w={"100%"}
              h={"100%"}
              justifyContent={"center"}
              gap={5}
              flexWrap={"wrap"}
            >
              <DietitianUserExerciseAndFoodDetailPanel />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
