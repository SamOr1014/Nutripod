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
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const fakeData: Array<any> = [
  { time: "09:00", booked: true },
  { time: "09:00", booked: true },
  { time: "09:00", booked: true },
  { time: "09:00", booked: true },
  { time: "09:00", booked: true },
  { time: "10:00", booked: false },
  { time: "11:00", booked: false },
  { time: "11:00", booked: false },
  { time: "11:00", booked: false },
  { time: "11:00", booked: false },
];

export default function UserBooking() {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [dietitian, setDietitian] = useState<string>("Gigi Wong");

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
                <option value="Gigi Wong">Gigi Wong</option>
                <option value="Bibi Kong">Bibi Kong</option>
                <option value="Kiki Song">Kiki Song</option>
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
            {selectedDate?.toLocaleDateString().split("/")[2]}年
            {selectedDate?.toLocaleDateString().split("/")[1]}月
            {selectedDate?.toLocaleDateString().split("/")[0]}日
          </Heading>
          <Flex flexWrap={"wrap"} flexDir={"column"} alignItems={"center"}>
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
      </Flex>
    </>
  );
}
