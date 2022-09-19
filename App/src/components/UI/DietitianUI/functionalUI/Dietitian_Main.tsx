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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { PatientDetailOfTodayBooking } from "../../../../utility/models";
import locateToken from "../../../../utility/Token";

const { REACT_APP_API_SERVER } = process.env;

export default function DietitianMain() {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  //redux states
  const currentDietitian = useSelector(
    (state: IRootState) => state.dietitian[0]
  );
  const timeslot = useSelector((state: IRootState) => state.timeslot);
  //local state
  const [allBooking, setAllBookings] = useState<Array<any>>([]);

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
        console.log(data);
      });
  }
  useEffect(() => {
    fetchSelectedDateBooking();
  }, [selectedDate]);
  function BookingDetailToday(patient: PatientDetailOfTodayBooking) {
    return (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {patient.time}
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
            <Button colorScheme="blue" size="sm">
              Follow Up
            </Button>
            <Button colorScheme="red" size="sm">
              Dismiss
            </Button>
            <Button colorScheme="green" size="sm">
              Attend
            </Button>
            <Button colorScheme="pink" size="sm">
              Absent
            </Button>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    );
  }

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
            {selectedDate?.toLocaleDateString().split("/")[2]}年
            {selectedDate?.toLocaleDateString().split("/")[1]}月
            {selectedDate?.toLocaleDateString().split("/")[0]}日
          </Heading>
          <Flex flexDir={"column"} alignItems={"center"} w={"100%"}>
            <Accordion allowToggle w={"100%"}>
              <BookingDetailToday
                id={1}
                first_name={"billy"}
                last_name={"wong"}
                height={175}
                weight={70}
                gender={"Male"}
                HKID={"A1234567"}
                phone={"23456789"}
                birthday={"1-1-1997"}
                time={"09:00"}
              />
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
