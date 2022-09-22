import {
  Button,
  Divider,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  useMediaQuery,
  Image,
  Text,
  AccordionButton,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Tag,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  FormLabel,
  HStack,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../../../../redux/store";
import {
  PatientDetailOfTodayBooking,
  UserPlusIndividualBooking,
} from "../../../../utility/models";
import locateToken from "../../../../utility/Token";

const { REACT_APP_API_SERVER } = process.env;

export default function DietitianMain() {
  let date = new Date();
  date.setDate(date.getDate() - 1);

  //date selected for different date's booking
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  //mediaquery
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  //open follow up booking modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMedRecOpen,
    onOpen: onMedRecOpen,
    onClose: onMedRecClose,
  } = useDisclosure();
  //redux states
  const currentDietitian = useSelector(
    (state: IRootState) => state.user.dietitian[0]
  );
  const timeslot = useSelector((state: IRootState) => state.timeslot);

  //local state for bookings of selected date
  const [allBooking, setAllBookings] = useState<
    Array<UserPlusIndividualBooking>
  >([]);

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
  //API Functions
  async function fetchSelectedDateBooking() {
    axios
      .get(
        `${REACT_APP_API_SERVER}/booking/date/${selectedDate?.toISOString()}/${
          currentDietitian.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        }
      )
      .then(({ data }) => {
        setAllBookings(data);
      });
  }

  useEffect(() => {
    fetchSelectedDateBooking();
  }, [selectedDate]);

  //Booking Detail Component
  function BookingDetailToday(patient: PatientDetailOfTodayBooking) {
    //submit follow up date for the user
    const [dateSubmit, setDateSubmit] = useState<Date>(new Date());
    const [currentDateBooking, setCurrentDateBooking] = useState<Array<any>>(
      []
    );

    async function fetchFollowUpAvailability() {
      axios
        .get(
          `${REACT_APP_API_SERVER}/booking/date/${dateSubmit?.toISOString()}/${
            currentDietitian.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          setCurrentDateBooking(data);
        });
    }

    async function postFollowUpBooking(
      timeid: number,
      dateString: string,
      currentBooking: number | string,
      uid: number | string,
      did: number | string
    ) {
      axios
        .post(
          `${REACT_APP_API_SERVER}/booking/followup`,
          {
            timeid,
            dateString,
            currentBooking,
            uid,
            did,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        )
        .then(({ data }) => {
          if (data.success) {
            fetchSelectedDateBooking();
            Swal.fire({
              icon: "success",
              title: `你成功預約${new Date(
                dateString
              ).toLocaleDateString()} ${timeslot[timeid - 1].time.slice(
                0,
                -3
              )}`,
            });
          }
        });
    }

    useEffect(() => {
      fetchFollowUpAvailability();
    }, [dateSubmit]);
    return (
      <>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {patient.time.slice(0, -3)}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            display={"flex"}
            justifyContent={"center"}
            flexDir={"column"}
            alignSelf={"center"}
          >
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
            <Stack spacing={4} direction="row" align="center" my={2}>
              {patient.follow_up === null ? (
                <>
                  <Button colorScheme="blue" size="sm" onClick={onOpen}>
                    覆診
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      axios
                        .put(
                          `${REACT_APP_API_SERVER}/booking/dismiss`,
                          {
                            bid: patient.bid,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${locateToken()}`,
                            },
                          }
                        )
                        .then(() => {
                          fetchSelectedDateBooking();
                        });
                    }}
                  >
                    完診
                  </Button>
                </>
              ) : patient.follow_up ? (
                <Tag colorScheme={"linkedin"} variant="solid">
                  需要覆診
                </Tag>
              ) : (
                <Tag colorScheme={"red"} variant="solid">
                  已完診
                </Tag>
              )}
              {patient.is_attended === null ? (
                <>
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => {
                      axios
                        .put(
                          `${REACT_APP_API_SERVER}/booking/attendance`,
                          {
                            booking: patient.bid,
                            attendance: "true",
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${locateToken()}`,
                            },
                          }
                        )
                        .then(() => {
                          fetchSelectedDateBooking();
                        });
                    }}
                  >
                    已出席
                  </Button>
                  <Button
                    colorScheme="pink"
                    size="sm"
                    onClick={() => {
                      axios
                        .put(
                          `${REACT_APP_API_SERVER}/booking/attendance`,
                          {
                            booking: patient.bid,
                            attendance: "false",
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${locateToken()}`,
                            },
                          }
                        )
                        .then(() => {
                          fetchSelectedDateBooking();
                        });
                    }}
                  >
                    缺席
                  </Button>
                </>
              ) : patient.is_attended ? (
                <>
                  <Tag colorScheme={"green"} variant="solid">
                    已出席
                  </Tag>
                </>
              ) : (
                <>
                  <Tag colorScheme={"red"} variant="solid">
                    缺席
                  </Tag>
                </>
              )}
              <Button colorScheme="cyan" size={"sm"} onClick={onMedRecOpen}>
                營養師撰要
              </Button>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        {/*  */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>覆診日期</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                onChange={(e) => {
                  setDateSubmit(new Date(e.target.value));
                }}
              />
            </ModalBody>

            <ModalFooter
              gap={2}
              flexWrap={"wrap"}
              display={"flex"}
              justifyContent={"center"}
            >
              {timeslot.map((time) => {
                if (
                  currentDateBooking.filter(
                    (booking) => booking.time === time.id
                  )[0]
                ) {
                  return <></>;
                }
                return (
                  <Button
                    key={`follow_up_${time.id}`}
                    onClick={() => {
                      postFollowUpBooking(
                        time.id,
                        dateSubmit.toISOString(),
                        patient.bid,
                        patient.id,
                        currentDietitian.id!
                      );
                      onClose();
                    }}
                  >
                    {time.time.slice(0, -3)}
                  </Button>
                );
              })}
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/*  */}
        {/* medRec form modal */}
        <Modal isOpen={isMedRecOpen} onClose={onMedRecClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>診症記錄</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  height: "",
                  weight: "",
                  sys: "",
                  dia: "",
                  bg: "",
                  content: "",
                }}
                onSubmit={(values) => {
                  axios
                    .post(
                      `${REACT_APP_API_SERVER}/medical`,
                      {
                        bid: patient.bid,
                        content: values.content,
                        height: values.height,
                        weight: values.weight,
                        sys: values.sys,
                        dia: values.dia,
                        bg: values.bg,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${locateToken()}`,
                        },
                      }
                    )
                    .then(() => {
                      Swal.fire({
                        icon: "success",
                        title: "成功提交報告",
                      });
                      onMedRecClose();
                    });
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <VStack gap={3}>
                      <HStack gap={2}>
                        <Flex flexDir={"column"}>
                          <FormLabel>身高:</FormLabel>
                          <Field
                            as={Input}
                            isRequired={true}
                            name="height"
                            type={"number"}
                            step="0.01"
                            placeholder={"cm"}
                          />
                        </Flex>
                        <Flex flexDir={"column"}>
                          <FormLabel>體重:</FormLabel>
                          <Field
                            as={Input}
                            isRequired={true}
                            name="weight"
                            type={"number"}
                            step="0.01"
                            placeholder={"kg"}
                          />
                        </Flex>
                      </HStack>
                      <HStack gap={2}>
                        <Flex flexDir={"column"}>
                          <FormLabel>上壓:</FormLabel>
                          <Field
                            as={Input}
                            isRequired={true}
                            name="sys"
                            type={"number"}
                            step="0.01"
                            placeholder={"mmHg"}
                          />
                        </Flex>
                        <Flex flexDir={"column"}>
                          <FormLabel>下壓:</FormLabel>
                          <Field
                            as={Input}
                            isRequired={true}
                            name="dia"
                            type={"number"}
                            step="0.01"
                            placeholder={"mmHg"}
                          />
                        </Flex>
                        <Flex flexDir={"column"}>
                          <FormLabel>血糖:</FormLabel>
                          <Field
                            as={Input}
                            isRequired={true}
                            name="bg"
                            type={"number"}
                            step="0.01"
                            placeholder={"mmol/L"}
                          />
                        </Flex>
                      </HStack>
                      <FormLabel>評語:</FormLabel>
                      <Field as={Textarea} isRequired={true} name="content" />
                      <ModalFooter>
                        <Button type={"submit"}>提交</Button>
                      </ModalFooter>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* end */}
      </>
    );
  }
  // The Whole Terminal
  return (
    <>
      <style>{css}</style>
      <Flex
        direction="row"
        maxW={"100%"}
        flex="8"
        p="2"
        borderRadius="2xl"
        flexWrap={"wrap"}
        gap={5}
        h={"720px"}
      >
        <Flex
          flex={1}
          flexDirection="column"
          bg={"gray.500"}
          p={4}
          borderRadius={"3xl"}
        >
          <Heading p={3} textAlign={"center"} mb={1}>
            📅請選擇應診日期
          </Heading>
          <Divider />
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <Flex gap={2} flexDir={"column"} justifyContent={"space-between"}>
              <Text textAlign={"center"} fontSize={"lg"}>
                營養師
              </Text>
              <Image
                boxSize={isSmallerThan600 ? "40" : "200px"}
                objectFit={"scale-down"}
                src="https://4.bp.blogspot.com/-yFu3rScjhnA/VPQT-JtUE0I/AAAAAAAAsFE/FxQfBOPTMKU/s450/medical_eiyoushi.png"
              />
              <Text textAlign={"center"} fontSize={"md"}>
                {currentDietitian.first_name + " " + currentDietitian.last_name}
              </Text>
            </Flex>

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
          <Flex alignItems={"center"} flexDir={"column"} mt={-5}>
            <Heading p={3} textAlign={"center"} mb={1}>
              ⚠️營養師注意事項
            </Heading>
            <Divider mb={2} />
            <OrderedList fontSize={"lg"} p={3}>
              <ListItem>請留意自己的診期，準時出席</ListItem>
              <ListItem>應診時記得核實病人身分證明文件及身份</ListItem>
              <ListItem>
                如應診當日天氣惡劣，職員會重新安排診期，屆時請留意最新診期
              </ListItem>
              <ListItem>如有疑問，請聯絡 23456789</ListItem>
            </OrderedList>
          </Flex>
        </Flex>

        <Flex
          flex={1}
          flexDirection="column"
          maxW={"100%"}
          p={4}
          borderRadius={"3xl"}
          bg={"gray.500"}
        >
          <Heading p={3} textAlign={"center"}>
          {selectedDate ? selectedDate?.getFullYear() : ""}年
            {selectedDate ? selectedDate?.getMonth() + 1 : ""}月
            {selectedDate ? selectedDate?.getDate() : ""}日
          </Heading>
          <Flex flexDir={"column"} alignItems={"center"} w={"100%"}>
            <Accordion allowToggle w={"100%"}>
              {allBooking.map((booking) => {
                return (
                  <BookingDetailToday
                    key={`current_date_booking_id_${booking.bid}`}
                    id={booking.user_id}
                    first_name={booking.first_name}
                    last_name={booking.last_name}
                    height={booking.height}
                    weight={booking.weight}
                    gender={
                      booking.gender === 1
                        ? "男"
                        : booking.gender === 2
                        ? "女"
                        : "其他"
                    }
                    HKID={booking.hkid}
                    phone={booking.phone}
                    birthday={new Date(booking.birthday).toLocaleDateString()}
                    time={timeslot[booking.time - 1].time}
                    is_attended={booking.is_attended}
                    follow_up={booking.follow_up}
                    bid={booking.bid}
                  />
                );
              })}
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
