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
  Divider,
  PopoverAnchor,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { MdToday } from "react-icons/md";
import Swal from "sweetalert2";
import {
  BGDetail,
  BPDetail,
  DietitianPatientPanel,
  WeightDetail,
} from "../../../../../utility/models";

export default function DietitianPatientDetailPanel(
  patient: DietitianPatientPanel
) {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");

  //################
  //API Functions
  //################

  // User Information components
  function UserDetailAndBooking() {
    return (
      <Flex
        flexDir={"column"}
        w={isSmallerThan600 ? "100%" : "30%"}
        h={isSmallerThan600 ? "100%" : isLargerThan1700 ? "682px" : "580px"}
        fontSize={isSmallerThan600 ? "sm" : "md"}
        borderRadius={"3xl"}
        bg={"gray.500"}
        p={5}
        gap={2}
      >
        <Heading
          textAlign={"center"}
          w={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
          fontSize={"xl"}
        >
          <Image
            boxSize={"50px"}
            objectFit={"scale-down"}
            src="https://4.bp.blogspot.com/-GkpJdW--_FQ/UYtb30fxqwI/AAAAAAAARsI/BYtuOrQAebw/s400/job_information.png"
          />
          病人個人資料
        </Heading>
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
            起始體重:
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
          <Text>
            {patient.gender === 1 ? "男" : patient.gender === 2 ? "女" : "其他"}
          </Text>
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
          <Text>{new Date(patient.birthday).toLocaleDateString()}</Text>
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
            fontSize={"xl"}
          >
            <Image
              boxSize={"50px"}
              objectFit={"scale-down"}
              src="https://1.bp.blogspot.com/-FsKd1JB-gCg/X5OcLEtvFTI/AAAAAAABb6M/9PkV67uAPuw-9tp4Rg0AqpmXHJikKcOGQCNcBGAsYHQ/s400/computer_doctor_woman.png"
            />
            病人已預約診期
          </Heading>
          <Flex w={"90%"} maxH={"80%"} overflow={"auto"}>
            <Table size={"sm"}>
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
            fontSize={"xl"}
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
    const [meal, setMeal] = useState<string>("早餐");
    const [foodDetail, setFoodDetail] = useState<Array<any>>([]);
    useEffect(() => {
      if (meal === "早餐") {
        console.log("B");
      }
      if (meal === "午餐") {
        console.log("L");
      }
      if (meal === "晚餐") {
        console.log("D");
      }
      if (meal === "小食") {
        console.log("S");
      }
    }, [meal]);
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
            h={isSmallerThan600 ? "100%" : isLargerThan1700 ? "655px" : "560px"}
            minH={"500px"}
            justifyContent={"center"}
            gap={5}
            flexWrap={"wrap"}
          >
            {/* exercise panel dietitian */}
            <Flex
              flexDir={"column"}
              bg={"gray.500"}
              w={"100%"}
              borderRadius={"3xl"}
              alignItems={"center"}
              p={3}
            >
              <Heading textAlign={"center"} fontSize={"2xl"}>
                運動
              </Heading>
              <Flex w={"100%"} overflow={"auto"} mt={2}>
                <Table
                  size={"sm"}
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
            h={isSmallerThan600 ? "100%" : isLargerThan1700 ? "655px" : "560px"}
            minH={"500px"}
            justifyContent={"center"}
            gap={5}
            flexWrap={"wrap"}
          >
            <Flex
              flexDir={"column"}
              bg={"gray.500"}
              w={"100%"}
              borderRadius={"3xl"}
              alignItems={"center"}
              p={3}
              position={"relative"}
            >
              <Flex>
                <Popover>
                  <Box flex={"1"}>
                    <PopoverAnchor>
                      <Heading textAlign={"center"} fontSize={"2xl"}>
                        {meal}
                      </Heading>
                    </PopoverAnchor>
                  </Box>
                  <PopoverTrigger>
                    <Button position={"absolute"} right={10} size={"sm"}>
                      更改
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      進食時間：
                      <RadioGroup
                        value={meal}
                        onChange={(value) => setMeal(value)}
                      >
                        <Radio mx={1} value="早餐">
                          早餐
                        </Radio>
                        <Radio mx={1} value="午餐">
                          午餐
                        </Radio>
                        <Radio mx={1} value="晚餐">
                          晚餐
                        </Radio>
                        <Radio mx={1} value="小食">
                          小食
                        </Radio>
                      </RadioGroup>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>

              <Box w={"90%"} maxH={"80%"} overflow={"auto"} mt={2}>
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

  function UserWeightBPBGData() {
    const [weightRec, setWeightRec] = useState<Array<WeightDetail>>([]);
    const [bpRec, setBpRec] = useState<Array<BPDetail>>([]);
    const [bgRec, setBgRec] = useState<Array<BGDetail>>([]);
    return (
      <>
        {/* Weight part */}
        <Flex
          flexDir={"column"}
          w={isSmallerThan600 ? "100%" : "30%"}
          h={isSmallerThan600 ? "100%" : isLargerThan1700 ? "682px" : "580px"}
          fontSize={isSmallerThan600 ? "sm" : "md"}
          borderRadius={"3xl"}
          bg={"gray.500"}
          p={5}
          gap={2}
        >
          <Flex
            h={isSmallerThan600 ? "auto" : "100px"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Flex
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                boxSize={isSmallerThan600 ? "100px" : "100px"}
                objectFit={"scale-down"}
                src="https://4.bp.blogspot.com/-SXG--O1E2i0/VVGVgRDH8QI/AAAAAAAAtmQ/U8HhB5NUFgc/s800/kenkoushindan03_taijuu.png"
              />
              <Heading textAlign={"center"} my={2}>
                體重記錄
              </Heading>
            </Flex>
          </Flex>
          <Divider />
          <Flex w={"100%"} maxH={"480px"} overflow={"auto"}>
            {/* Weight Table */}
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.100"}>
                <Tr>
                  <Th>日期</Th>
                  <Th textAlign={"center"}>體重(kg)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {weightRec.map((rec) => {
                  return (
                    <Tr key={`weight_rec_${rec.id}`}>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {new Date(rec.date).toLocaleDateString()}
                      </Td>
                      <Td
                        fontSize={isSmallerThan600 ? "14" : "16"}
                        textAlign={"center"}
                      >
                        {rec.weight}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            {/* Weight Table end */}
          </Flex>
        </Flex>
        {/* BP */}
        <Flex
          flexDir={"column"}
          w={isSmallerThan600 ? "100%" : "30%"}
          h={isSmallerThan600 ? "100%" : isLargerThan1700 ? "682px" : "580px"}
          fontSize={isSmallerThan600 ? "sm" : "md"}
          borderRadius={"3xl"}
          bg={"gray.500"}
          p={5}
          gap={2}
        >
          <Flex
            h={isSmallerThan600 ? "auto" : "100px"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Flex
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                boxSize={isSmallerThan600 ? "70px" : "100px"}
                objectFit={"scale-down"}
                src="https://1.bp.blogspot.com/-YIL1WatLnQc/U82wyiz4GnI/AAAAAAAAjDk/i1S5WQtHxWs/s400/body_shinzou_good.png"
              />
              <Heading textAlign={"center"} my={2}>
                血壓記錄
              </Heading>
            </Flex>
          </Flex>
          <Divider />
          {/* BP Table */}
          <Flex
            w={"100%"}
            maxH={"500px"}
            overflow={"auto"}
            overflowX={"hidden"}
          >
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.100"}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th textAlign={"center"}>上壓/下壓(mmHg)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bpRec.map((rec) => {
                  return (
                    <Tr key={`bp_rec_${rec.id}`}>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {new Date(rec.date).toLocaleDateString()}
                      </Td>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {rec.time.slice(0, -3)}
                      </Td>
                      <Td
                        fontSize={isSmallerThan600 ? "14" : "16"}
                        textAlign={"center"}
                      >
                        {rec.sys_bp}/{rec.dia_bp}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
          {/* BP Table end */}
        </Flex>
        {/* BG */}
        <Flex
          flexDir={"column"}
          w={isSmallerThan600 ? "100%" : "30%"}
          h={isSmallerThan600 ? "100%" : isLargerThan1700 ? "682px" : "580px"}
          fontSize={isSmallerThan600 ? "sm" : "md"}
          borderRadius={"3xl"}
          bg={"gray.500"}
          p={5}
          gap={2}
        >
          <Flex
            h={isSmallerThan600 ? "auto" : "100px"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Flex
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                boxSize={isSmallerThan600 ? "70px" : "100px"}
                objectFit={"scale-down"}
                src="https://1.bp.blogspot.com/-ksgJvY53NnY/VVGVGspTMlI/AAAAAAAAtho/B6brGWmDc9Y/s400/insulin_woman.png"
              />
              <Heading textAlign={"center"} my={2}>
                血糖度數記錄
              </Heading>
            </Flex>
          </Flex>
          <Divider />
          {/* BG Table */}
          <Flex
            w={"100%"}
            maxH={"500px"}
            overflow={"auto"}
            overflowX={"hidden"}
          >
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.100"}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th fontSize={"12"} textAlign={"center"}>
                    血糖(mmol/L)
                  </Th>
                </Tr>
              </Thead>
              <Tbody fontSize={"2px"}>
                {bgRec.map((rec) => {
                  return (
                    <Tr key={`bg_rec_${rec.id}`}>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {new Date(rec.date).toLocaleDateString()}
                      </Td>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {rec.time.slice(0, -3)}
                      </Td>
                      <Td
                        fontSize={isSmallerThan600 ? "14" : "16"}
                        textAlign={"center"}
                      >
                        {rec.bg_measurement}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
          {/* BG Table end */}
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
          <Tab>用家記錄</Tab>
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
              justifyContent={"space-evenly"}
              gap={5}
              flexWrap={"wrap"}
            >
              <DietitianUserExerciseAndFoodDetailPanel />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              w={"100%"}
              h={"100%"}
              justifyContent={"space-evenly"}
              gap={5}
              flexWrap={"wrap"}
            >
              <UserWeightBPBGData />{" "}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
