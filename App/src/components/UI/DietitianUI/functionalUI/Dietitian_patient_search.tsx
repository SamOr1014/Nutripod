import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import DietitianPatientDetailPanel from "./sub-components/DietitianPatientDetailPanel";

export default function PatientSearchPanel() {
  return (
    <Flex gap={5} flexDir={"column"} w={"100%"}>
      <Flex gap={5} flexDir={"column"} w={"100%"}>
        <Heading textAlign={"center"} fontSize={"xl"}>
          Search Patient With HKID here:
        </Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input type="text" placeholder="HKID" />
        </InputGroup>
      </Flex>
      {/* Patient Detail Panel */}
      <Flex maxHeight={"100%"} w={"100%"} flex={1}>
        {/* If user exist show this */}
        <DietitianPatientDetailPanel
          id={1}
          first_name={"billy"}
          last_name={"wong"}
          height={175}
          weight={70}
          gender={"Male"}
          HKID={"A1234567"}
          phone={"23456789"}
          birthday={"1-1-1997"}
        />
      </Flex>
    </Flex>
  );
}
