import {
  Button,
  Divider,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Image,
  useMediaQuery,
  Text,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Swal from "sweetalert2";
import { UserBookingDetailByDateAndDietitian } from "../../../../utility/models";
const { REACT_APP_API_SERVER } = process.env;

// const staticDietitianList =

const staticTimeSlot = [
  {
    id: 1,
    time: "09:00:00",
  },
  {
    id: 2,
    time: "10:00:00",
  },
  {
    id: 3,
    time: "11:00:00",
  },
  {
    id: 4,
    time: "12:00:00",
  },
  {
    id: 5,
    time: "14:00:00",
  },
  {
    id: 6,
    time: "15:00:00",
  },
  {
    id: 7,
    time: "16:00:00",
  },
  {
    id: 8,
    time: "17:00:00",
  },
];

export default function UserBooking() {
  //######################
  //#####Fake UserID######
  const uID = 1;
  //####Remember to#######
  //####Use JWT Token####
  //######################

  let date = new Date();
  date.setDate(date.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [dietitian, setDietitian] = useState<string>("");
  const [existedBookings, setExistedBooking] = useState<
    Array<UserBookingDetailByDateAndDietitian>
  >([]);

  async function postBookingToServer(
    timeslotID: string | number,
    dietitianID: string,
    date: string
  ) {
    const result = await axios.post(`${REACT_APP_API_SERVER}/booking`, {
      date: date,
      time: timeslotID,
      dietitian_id: dietitianID,
      user: uID,
    });
    await fetchBookingDetail();
  }

  async function fetchBookingDetail() {
    if (selectedDate && dietitian) {
      const { data } = await axios.get(
        `${REACT_APP_API_SERVER}/booking/date/${selectedDate?.toISOString()}/${dietitian}`
      );
      let dateBookingWithSelectedDietitian = data;
      setExistedBooking(dateBookingWithSelectedDietitian);
    }
    return;
  }
  useEffect(() => {
    fetchBookingDetail();
  }, [selectedDate, dietitian]);
  //debug use to check if fetch is done
  useEffect(() => {
    console.log(existedBookings);
  }, [existedBookings]);
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

  return (
    <>
      <style>{css}</style>
      <Flex
        direction="row"
        flex="8"
        p="2"
        borderRadius="2xl"
        flexWrap={"wrap"}
        gap={5}
        maxH={"800px"}
      >
        <Flex
          flex={1}
          flexDirection="column"
          bg={"gray.500"}
          p={4}
          borderRadius={"3xl"}
          w={"100%"}
        >
          <Heading p={3} textAlign={"center"} mb={1}>
            📅請選擇預約營養師及日期
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
              <Select
                variant={"filled"}
                placeholder="選擇營養師"
                onChange={(e) => {
                  setDietitian(e.target.value);
                }}
              >
                <option value="1">Gigi Wong</option>
                <option value="2">Bibi Kong</option>
                <option value="3">Kiki Song</option>
              </Select>
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
              disabled={[
                {
                  from: new Date(0, 1, 1),
                  to: new Date(),
                },
              ]}
            />
          </Flex>
          <Flex alignItems={"center"} flexDir={"column"} mt={-5}>
            <Heading p={3} textAlign={"center"} mb={1}>
              ⚠️注意事項
            </Heading>
            <Divider mb={2} />
            <OrderedList fontSize={"xl"} p={3}>
              <ListItem>請留意自己的診期，逾期必須重新再預約</ListItem>
              <ListItem>到診時記得帶齊身分證明文件，以便職員核實身份</ListItem>
              <ListItem>如應診當日天氣惡劣，職員會聯絡你重新安排診期</ListItem>
              <ListItem>如有疑問，請致電 23456789</ListItem>
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
          <Flex
            flexWrap={"wrap"}
            flexDir={"column"}
            alignItems={"center"}
            gap={5}
          >
            {/* This is where u put the buttons */}
            {selectedDate && dietitian ? (
              staticTimeSlot.map((timeslotDetail) => {
                if (
                  existedBookings.filter(
                    (existbooking) => existbooking.time === timeslotDetail.id
                  )[0]
                ) {
                  return (
                    <Button
                      key={`booking_button_${timeslotDetail.id}`}
                      disabled={true}
                      w={"100%"}
                    >
                      {timeslotDetail.time.slice(0, -3)}
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      key={`booking_button_${timeslotDetail.id}`}
                      w={"100%"}
                      onClick={() => {
                        Swal.fire({
                          icon: "question",
                          title: "Please confirm Your Booking",
                          text: `Time: ${
                            timeslotDetail.time
                          }, Date: ${selectedDate.toLocaleDateString()}`,
                          showCloseButton: true,
                          showCancelButton: true,
                        }).then(async (value) => {
                          if (value.isConfirmed) {
                            await postBookingToServer(
                              timeslotDetail.id,
                              dietitian,
                              selectedDate.toISOString()
                            );
                            Swal.fire({
                              icon: "success",
                              title: `You Have Booked on ${selectedDate.toLocaleDateString()} at ${
                                timeslotDetail.time
                              }`,
                            });
                          }
                        });
                      }}
                    >
                      {timeslotDetail.time.slice(0, -3)}
                    </Button>
                  );
                }
              })
            ) : (
              <Text>請選擇時間及營養師</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
