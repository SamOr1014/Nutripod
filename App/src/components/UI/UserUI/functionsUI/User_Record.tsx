import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";

export default function UserBPBGRecord() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
  return (
    <>
      <Flex
        gap={1}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        w="100%"
        my={2}
      >
        {/* Weight part */}
        <Flex
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "32%" : "430px"}
          bg={"gray.500"}
          borderRadius={"3xl"}
          flexDir={"column"}
          maxH={"800px"}
          p={5}
        >
          <Flex>
            <Flex>
              <Image
                boxSize={isSmallerThan600 ? "100px" : "150px"}
                objectFit={"scale-down"}
                src="https://4.bp.blogspot.com/-SXG--O1E2i0/VVGVgRDH8QI/AAAAAAAAtmQ/U8HhB5NUFgc/s800/kenkoushindan03_taijuu.png"
              />
            </Flex>
            <Flex gap={2} flexWrap={"wrap"} flexDir={"column"}>
              <Heading
                fontSize={isSmallerThan600 ? "md" : "lg"}
                minH={isSmallerThan600 ? "auto" : "44px"}
              >
                請更新你的體重！我們建議你每星期更新一次！
              </Heading>
              <Flex gap={2} p={4} flexWrap={"wrap"}>
                <Input
                  placeholder="體重(kg)"
                  htmlSize={isSmallerThan600 ? 6 : 4}
                  width="auto"
                  size={"sm"}
                />
                <Button size={"sm"}>更新</Button>
              </Flex>
            </Flex>
          </Flex>
          <Divider my={3} />
          <Heading textAlign={"center"} my={2}>
            體重記錄
          </Heading>
          <Flex w={"100%"} maxH={"500px"} overflow={"auto"}>
            {/* Weight Table */}
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.300"}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th isNumeric>體重(kg)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>22/09/2022</Td>
                  <Td>09:00</Td>
                  <Td isNumeric>60.4</Td>
                </Tr>
              </Tbody>
            </Table>
            {/* Weight Table end */}
          </Flex>
        </Flex>
        {/* BP */}
        <Flex
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "32%" : "430px"}
          bg={"gray.500"}
          borderRadius={"3xl"}
          flexDir={"column"}
          maxH={"800px"}
          p={5}
        >
          <Flex>
            <Flex>
              <Image
                boxSize={isSmallerThan600 ? "70px" : "130px"}
                objectFit={"scale-down"}
                src="https://1.bp.blogspot.com/-YIL1WatLnQc/U82wyiz4GnI/AAAAAAAAjDk/i1S5WQtHxWs/s400/body_shinzou_good.png"
              />
            </Flex>
            <Flex gap={2} p={4} flexWrap={"wrap"} flexDir={"column"}>
              <Heading
                fontSize={isSmallerThan600 ? "md" : "lg"}
                minH={isSmallerThan600 ? "auto" : "44px"}
              >
                請更新你的血壓！
              </Heading>
              <Flex gap={3}>
                <Flex flexDir={"column"}>
                  <Input
                    placeholder="上壓(mmHg)"
                    htmlSize={6}
                    width="auto"
                    size={"sm"}
                  />
                  <Input
                    placeholder="下壓(mmHg)"
                    htmlSize={6}
                    width="auto"
                    size={"sm"}
                  />
                </Flex>
                <Button size={"sm"}>更新</Button>
              </Flex>
            </Flex>
          </Flex>
          <Divider my={3} />
          <Heading textAlign={"center"} my={2}>
            血壓記錄
          </Heading>
          {/* BP Table */}
          <Flex w={"100%"} maxH={"500px"} overflow={"auto"}>
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.300"}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th isNumeric>上壓/下壓(mmHg)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>22/09/2022</Td>
                  <Td>09:00</Td>
                  <Td isNumeric>110/60</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
          {/* BP Table end */}
        </Flex>
        {/* BG */}
        <Flex
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "32%" : "430px"}
          bg={"gray.500"}
          borderRadius={"3xl"}
          flexDir={"column"}
          maxH={"800px"}
          p={5}
        >
          <Flex>
            <Flex>
              <Image
                boxSize={isSmallerThan600 ? "100px" : "150px"}
                objectFit={"scale-down"}
                src="https://1.bp.blogspot.com/-ksgJvY53NnY/VVGVGspTMlI/AAAAAAAAtho/B6brGWmDc9Y/s400/insulin_woman.png"
              />
            </Flex>
            <Flex gap={2} p={4} flexWrap={"wrap"} flexDir={"column"}>
              <Heading
                fontSize={isSmallerThan600 ? "md" : "lg"}
                minH={isSmallerThan600 ? "auto" : "44px"}
              >
                請更新你的血糖指數！
              </Heading>
              <Flex gap={2} flexWrap={"wrap"}>
                <Input
                  placeholder="mmol/L"
                  htmlSize={isSmallerThan600 ? 6 : 2}
                  width="auto"
                  size={"sm"}
                />
                <Button size={"sm"}>更新</Button>
              </Flex>
            </Flex>
          </Flex>
          <Divider my={3} />
          <Heading textAlign={"center"} my={2}>
            血糖度數記錄
          </Heading>
          {/* BG Table */}
          <Flex w={"100%"} maxH={"500px"} overflow={"auto"}>
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.300"}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th isNumeric>血糖(mmol/L)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>22/09/2022</Td>
                  <Td>09:00</Td>
                  <Td isNumeric>5.6</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
          {/* BG Table end */}
        </Flex>
      </Flex>
    </>
  );
}
