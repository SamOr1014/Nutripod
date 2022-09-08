import { Center, Flex, Wrap } from "@chakra-ui/react";
import { useState } from "react";
<<<<<<< HEAD
import "../../../../CSS/Calendar.css";
=======
>>>>>>> 4bfc492270ba25fbd5dfe5a9b75ee2bcc93671b6

export default function DietitianMain() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <Flex flexWrap="wrap" width="100%" mr="2">
<<<<<<< HEAD
        <Flex flex="1" max-height="100%" flexDir="column">
          
        </Flex>
=======
        <Flex flex="1" max-height="100%" flexDir="column"></Flex>
>>>>>>> 4bfc492270ba25fbd5dfe5a9b75ee2bcc93671b6
        <Flex flex="1" height="100%" flexDirection="column" ml="2">
          <Center mb="5">
            <h1>{selectedDate.toLocaleDateString()}</h1>
          </Center>
          <Wrap width="100%"></Wrap>
        </Flex>
      </Flex>
    </>
  );
}
