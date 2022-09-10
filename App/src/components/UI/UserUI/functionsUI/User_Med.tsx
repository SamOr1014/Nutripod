import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";

export default function UserMed() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
  return (
    <Flex
      minW={"100%"}
      maxH={"800px"}
      borderRadius={"3xl"}
      bg={"gray.500"}
      p={isSmallerThan600 ? 0 : 3}
      my={2}
      gap={10}
      justifyContent={"center"}
      flexWrap={"wrap"}
    >
      <Flex flexDir={"column"} w={isSmallerThan600 ? "100%" : "45%"}>
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
        <Flex w={"100%"} maxH={"80%"} overflow={"auto"}>
          <Table size={isSmallerThan600 ? "sm" : "md"}>
            <Thead position="sticky" top={0} bg={"gray.300"} zIndex={100}>
              <Tr>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Dietitian</Th>
                <Th isNumeric>Cancel</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>22/9/2022</Td>
                <Td>09:00</Td>
                <Td>Gigi Wong</Td>
                <Td isNumeric>
                  <Button
                    bg={"red.700"}
                    borderRadius={"lg"}
                    size={isSmallerThan600 ? "xs" : "sm"}
                  >
                    Cancel
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Flex>

      <Flex flexDir={"column"} w={isSmallerThan600 ? "100%" : "45%"}>
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
        <Box w={"100%"} maxH={"80%"} overflow={"auto"}>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Flex>
    </Flex>
  );
}
