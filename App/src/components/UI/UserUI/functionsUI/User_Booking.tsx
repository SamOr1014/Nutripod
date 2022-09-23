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
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../../../../redux/store";
import { UserBookingDetailByDateAndDietitian } from "../../../../utility/models";
import locateToken from "../../../../utility/Token";

const {
  REACT_APP_API_SERVER,
  REACT_APP_SMS_AC_ID,
  REACT_APP_PHONE_NUMBER,
  REACT_APP_SMS_API_KEY,
} = process.env;

export default function UserBooking() {
  const bg = useColorModeValue("gray.200", "gray.700");

  const staticDietitianList = useSelector(
    (state: IRootState) => state.dietitian
  );
  const staticTimeSlot = useSelector((state: IRootState) => state.timeslot);
  const dietitianList = useSelector((state: IRootState) => state.dietitian);
  const userInfo = useSelector((state: IRootState) => state.user.user);

  let date = new Date();
  date.setDate(date.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [dietitian, setDietitian] = useState<string>("");
  const [existedBookings, setExistedBooking] = useState<
    Array<UserBookingDetailByDateAndDietitian>
  >([]);

  async function fetchBookingDetail() {
    if (selectedDate && dietitian) {
      const { data } = await axios.get(
        `${REACT_APP_API_SERVER}/booking/date/${selectedDate?.toISOString()}/${dietitian}`,
        {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        }
      );
      let dateBookingWithSelectedDietitian = data;
      setExistedBooking(dateBookingWithSelectedDietitian);
    }
    return;
  }

  async function postBookingToServer(
    timeslotID: string | number,
    dietitianID: string,
    date: string
  ) {
    axios
      .post(
        `${REACT_APP_API_SERVER}/booking`,
        {
          date: date,
          time: timeslotID,
          dietitian_id: dietitianID,
          uid: userInfo[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        }
      )

      .then(async () => {
        await fetchBookingDetail();
      })
      .catch(({ response }) => {
        if (response.data.rebook) {
          Swal.fire({
            icon: "warning",
            title: "同日不能重複預約",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "發生錯誤，請稍後再試",
          });
        }
      });
  }
  useEffect(() => {
    fetchBookingDetail();
  }, [selectedDate, dietitian]);
  //debug use to check if fetch is done

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
          bg={bg}
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
                {staticDietitianList.map((dietitianDetail) => {
                  return (
                    <option
                      key={`dietitian_individual_${dietitianDetail.id}`}
                      value={`${dietitianDetail.id}`}
                    >
                      {dietitianDetail.first_name} {dietitianDetail.last_name}
                    </option>
                  );
                })}
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
          bg={bg}
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
                          title: "請確認以下時間",
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
                              title: `你已經預約${selectedDate.toLocaleDateString()}的${timeslotDetail.time.slice(
                                0,
                                -3
                              )}，稍後會有短訊確定你的預約時間`,
                            }).then(async () => {
                              await axios.post(
                                `https://sms.8x8.com/api/v1/subaccounts/${REACT_APP_SMS_AC_ID}/messages`,
                                {
                                  encoding: "AUTO",
                                  track: "None",
                                  destination: `${REACT_APP_PHONE_NUMBER}`,
                                  text: `你已經預約${selectedDate.toLocaleDateString()}的${timeslotDetail.time.slice(
                                    0,
                                    -3
                                  )}。營養師為${
                                    dietitianList.filter(
                                      (dietitianInfo) =>
                                        dietitianInfo.id === parseInt(dietitian)
                                    )[0].first_name
                                  } ${
                                    dietitianList.filter(
                                      (dietitianInfo) =>
                                        dietitianInfo.id === parseInt(dietitian)
                                    )[0].last_name
                                  }，請記得準時到診`,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${REACT_APP_SMS_API_KEY}`,
                                  },
                                }
                              );
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
