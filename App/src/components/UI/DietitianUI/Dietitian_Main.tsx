import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Select,
  useMediaQuery,
  Wrap,
  Image,
  Text,
  AccordionButton,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

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

export default function DietitianMain() {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

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
            📅請選擇預約日期
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
                Dietitian Name
                {/* Dietitian Name */}
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
            {selectedDate?.toLocaleDateString().split("/")[2]}年
            {selectedDate?.toLocaleDateString().split("/")[1]}月
            {selectedDate?.toLocaleDateString().split("/")[0]}日
          </Heading>
          <Flex flexDir={"column"} alignItems={"center"} w={"100%"}>
            <Accordion allowToggle w={"100%"}>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
