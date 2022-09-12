import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const { REACT_APP_API_SERVER } = process.env;
interface UserBookingData {
  id: number;
  date: string;
  first_name: string;
  last_name: string;
  time: string;
}

export default function UserMed() {
  const userID = 1;

  const [booking, setBooking] = useState<Array<UserBookingData>>([]);

  async function fetchBooking() {
    let userBooking = await axios.get(
      `${REACT_APP_API_SERVER}/booking/user/${userID}`
    );
    if (userBooking.data.success) {
      if (userBooking.data.data) {
        setBooking(userBooking.data.data);
      } else {
        setBooking([]);
      }
    } else {
      await Swal.fire({
        icon: "error",
        title: "Fail to get your booking, Please try again",
      });
    }
  }

  async function deleteBooking(bookingID: number | string) {
    let deleteRes = await axios.delete(
      `${REACT_APP_API_SERVER}/booking/user/${userID}/${bookingID}`
    );
    if (deleteRes.data.success) {
      Swal.fire({
        icon: "success",
        title: "Delete Successful",
      });
      await fetchBooking();
      return;
    }
  }
  useEffect(() => {
    fetchBooking();
  }, []);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
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
        <Flex w={"100%"} maxH={"80%"} overflow={"auto"} flexDir={"column"}>
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
              {booking.map((detail) => {
                return (
                  <Tr key={`bookingid-${detail.id}`}>
                    <Td>{new Date(detail.date).toLocaleDateString()}</Td>
                    <Td>{detail.time.slice(0, -3)}</Td>
                    <Td>{detail.first_name + " " + detail.last_name}</Td>
                    <Td isNumeric>
                      <Button
                        bg={"red.700"}
                        borderRadius={"lg"}
                        size={isSmallerThan600 ? "xs" : "sm"}
                        onClick={() => {
                          Swal.fire({
                            icon: "question",
                            title:
                              "Can you confirm that you want to delete this booking",
                            html: `<p><b>Date</b>: ${new Date(
                              detail.date
                            ).toLocaleDateString()}</p> <br> <p><b>Time</b>: ${detail.time.slice(
                              0,
                              -3
                            )}</p> <br> <p><b>Dietitian</b>: ${
                              detail.first_name + " " + detail.last_name
                            }</p>`,
                            showCloseButton: true,
                            showCancelButton: true,
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await deleteBooking(detail.id);
                            }
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        {booking[0] === undefined ? (
          <Heading textAlign={"center"} color={"red.700"}>
            你暫時未有已預約診期
          </Heading>
        ) : (
          ""
        )}
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
