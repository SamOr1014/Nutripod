import { Button, Center, Flex, Heading, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "../../../../CSS/Calendar.css";

export default function UserBooking() {
  const fakeData: Array<any> = [
    { time: "09:00", booked: true },
    { time: "10:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <Flex flex="2" flexDirection="column">
        <Heading p={3} textAlign={"center"}>
          請選擇預約日期📅
        </Heading>
        <Calendar
          onClickDay={(value) => {
            setSelectedDate(value);
          }}
        />
      </Flex>

      <Flex flex="1" flexDirection="column">
        <Heading p={3} textAlign={"center"}>
          {selectedDate.toLocaleDateString().split("/")[2]}年
          {selectedDate.toLocaleDateString().split("/")[1]}月
          {selectedDate.toLocaleDateString().split("/")[0]}日
        </Heading>
        <Flex
          flexWrap={"wrap"}
          flexDir={"column"}
          alignItems={"center"}
          w={"100%"}
        >
          {fakeData.map((booking) => {
            if (booking.booked) {
              return (
                <Button my={"1"} w={"100%"} disabled={true}>
                  {booking.time}
                </Button>
              );
            } else {
              return (
                <Button w={"100%"} my={"1"}>
                  {booking.time}
                </Button>
              );
            }
          })}
        </Flex>
      </Flex>
    </>
  );
}
