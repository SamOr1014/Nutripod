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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../../../../redux/store";
import { UserBookingData } from "../../../../utility/models";
import locateToken from "../../../../utility/Token";

const {
  REACT_APP_API_SERVER,
  REACT_APP_SMS_AC_ID,
  REACT_APP_PHONE_NUMBER,
  REACT_APP_SMS_API_KEY,
} = process.env;

export default function UserMed() {
  const bg = useColorModeValue("gray.200", "gray.700");
  const user = useSelector((state: IRootState) => state.user.user);
  const uID = user[0].id;
  const dietitianList = useSelector((state: IRootState) => state.dietitian);
  const [booking, setBooking] = useState<Array<UserBookingData>>([]);
  const [medRec, setMedRec] = useState<Array<any>>([]);

  const userAge = () => {
    let today = new Date();
    let birthDate = new Date(medRec[0].birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  //#############
  //API FUNCTIONS
  //#############
  //fetching
  async function fetchBooking() {
    axios
      .get(`${REACT_APP_API_SERVER}/booking/user/${uID}`, {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      })
      .then((response) => {
        setBooking(response.data.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "暫時未能取得你的預約，請稍後再試",
        });
      });
  }

  async function fetchMedEvaluation() {
    axios
      .get(`${REACT_APP_API_SERVER}/medical/user/${uID}`, {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      })
      .then(({ data }) => {
        setMedRec(data.result);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "暫時未能取得你的預約，請稍後再試",
        });
      });
  }
  //delete
  async function deleteBooking(
    bookingID: number | string,
    date: any,
    time: any
  ) {
    axios
      .delete(`${REACT_APP_API_SERVER}/booking/user/${uID}/${bookingID}`, {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "移除成功",
        }).then(async () => {
          await axios.post(
            `https://sms.8x8.com/api/v1/subaccounts/${REACT_APP_SMS_AC_ID}/messages`,
            {
              encoding: "AUTO",
              track: "None",
              destination: `${REACT_APP_PHONE_NUMBER}`,
              text: `你已取消${date} ${time}的預約`,
            },
            {
              headers: {
                Authorization: `Bearer ${REACT_APP_SMS_API_KEY}`,
              },
            }
          );
        });
        fetchBooking();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "發生錯誤，請稍後再試",
        });
      });
  }
  useEffect(() => {
    if (uID) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fetchBooking();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fetchMedEvaluation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  return (
    <Flex
      minW={"100%"}
      maxH={isSmallerThan600 ? "auto" : "800px"}
      borderRadius={"3xl"}
      bg={bg}
      p={isSmallerThan600 ? 0 : 3}
      my={2}
      gap={10}
      justifyContent={"center"}
      flexWrap={"wrap"}
    >
      <Flex
        flexDir={"column"}
        w={isSmallerThan600 ? "100%" : "45%"}
        maxH={"100%"}
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
        <Flex w={"100%"} maxH={"80%"} overflow={"auto"} flexDir={"column"}>
          <Table size={isSmallerThan600 ? "sm" : "md"}>
            <Thead position="sticky" top={0} bg={"gray.300"} zIndex={1}>
              <Tr>
                <Th>日期</Th>
                <Th>時間</Th>
                <Th>營養師</Th>
                <Th isNumeric></Th>
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
                            title: "請確定你想取消此預約",
                            html: `<p><b>日期</b>: ${new Date(
                              detail.date
                            ).toLocaleDateString()}</p> <br> <p><b>時間</b>: ${detail.time.slice(
                              0,
                              -3
                            )}</p> <br> <p><b>營養師</b>: ${
                              detail.first_name + " " + detail.last_name
                            }</p>`,
                            showCloseButton: true,
                            showCancelButton: true,
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await deleteBooking(
                                detail.id,
                                new Date(detail.date).toLocaleDateString(),
                                detail.time.slice(0, -3)
                              );
                            }
                          });
                        }}
                      >
                        取消
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
          病人診症記錄
        </Heading>
        <Box w={"100%"} maxH={"80%"} overflow={"auto"}>
          <Accordion allowToggle>
            {medRec.map((rec) => {
              return (
                <AccordionItem key={`dietitian_reports_${rec.rid}`}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {new Date(rec.date).getFullYear().toString() +
                          "年" +
                          (new Date(rec.date).getMonth() + 1).toString() +
                          "月" +
                          new Date(rec.date).getDate().toString() +
                          "日"}
                        的診症記錄
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex width={"100%"}>
                      <Box flex={1}>
                        <Text fontWeight={"bold"}>
                          主診營養師：{" "}
                          {dietitianList.filter(
                            (dietitian) => dietitian.id === rec.dietitian_id
                          )[0].first_name +
                            " " +
                            dietitianList.filter(
                              (dietitian) => dietitian.id === rec.dietitian_id
                            )[0].last_name}
                        </Text>
                        <Text fontWeight={"bold"}>
                          日期： {new Date(rec.date).toLocaleDateString()}
                        </Text>
                        <Text fontWeight={"bold"}>姓： {rec.last_name}</Text>
                        <Text fontWeight={"bold"}>名： {rec.first_name}</Text>
                        <Text fontWeight={"bold"}>年齡： {userAge()}</Text>
                        <Text fontWeight={"bold"}>
                          性別：{" "}
                          {rec.gender === 1
                            ? "男"
                            : rec.gender === 2
                            ? "女"
                            : "其他"}
                        </Text>
                        <Text fontWeight={"bold"}>身高： {rec.height} cm</Text>
                        <Text fontWeight={"bold"}>體重： {rec.weight} kg</Text>
                        <Text fontWeight={"bold"}>
                          BMI：{" "}
                          {(rec.weight / (rec.height / 100) ** 2)
                            .toString()
                            .slice(0, 5)}{" "}
                        </Text>
                        <Text fontWeight={"bold"}>
                          血壓： {rec.bp}/{rec.bp} mmHG
                        </Text>
                        <Text fontWeight={"bold"}>血糖：{rec.bg} mmol/L</Text>
                        <Text fontWeight={"bold"}>
                          慢性疾病：{rec.disease}{" "}
                        </Text>
                      </Box>

                      <Box flex={1}>
                        <Text fontWeight={"bold"}>評估：</Text>
                        <Text fontWeight={"bold"}>{rec.content}</Text>
                      </Box>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Box>
      </Flex>
    </Flex>
  );
}
