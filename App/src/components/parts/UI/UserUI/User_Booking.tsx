import { Center, Flex, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "../../../../CSS/Calendar.css";
import BookingDetail from "../../functions/BookingDetail";

export default function UserBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <Flex flexWrap="wrap" width="100%" mr="2">
        <Flex flex="1" max-height="100%" flexDir="column">
          <Calendar
            onClickDay={(value) => {
              setSelectedDate(value);
            }}
          />
        </Flex>
        <Flex flex="1" height="100%" flexDirection="column" ml="2">
          <Center mb="5">
            <h1>{selectedDate.toLocaleDateString()}</h1>
          </Center>
          <Wrap width="100%">
            <BookingDetail />
          </Wrap>
        </Flex>
      </Flex>
    </>
  );
}
