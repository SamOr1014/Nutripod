import { Button, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import {
  BsFillHouseFill,
  BsTable,
  BsFillChatRightTextFill,
  BsArchiveFill,
  BsFillFileMedicalFill,
} from "react-icons/bs";

interface OptionalFunction {
  closeDrawer?: (state: any) => void;
}

export default function UserNavLinks(props: OptionalFunction) {
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
  return (
    <>
      <Link to="/dashboard" as={ReactLink}>
        <Button
          w={isLargerThan1700 ? 24 : 16}
          h={isLargerThan1700 ? 24 : 16}
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsFillHouseFill size={isLargerThan1700 ? "40px" : "30px"} />
          <Text mt={1} fontSize={isLargerThan1700 ? "2xl" : "md"}>
            主頁
          </Text>
        </Button>
      </Link>
      <Link to="/dashboard/booking" as={ReactLink}>
        <Button
          w={isLargerThan1700 ? 24 : 16}
          h={isLargerThan1700 ? 24 : 16}
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsTable size={isLargerThan1700 ? "40px" : "30px"} />
          <Text mt={1} fontSize={isLargerThan1700 ? "2xl" : "md"}>
            預約
          </Text>
        </Button>
      </Link>
      <Link to="/dashboard/history" as={ReactLink}>
        <Button
          w={isLargerThan1700 ? 24 : 16}
          h={isLargerThan1700 ? 24 : 16}
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsArchiveFill size={isLargerThan1700 ? "40px" : "30px"} />
          <Text mt={1} fontSize={isLargerThan1700 ? "2xl" : "md"}>
            記錄
          </Text>
        </Button>
      </Link>
      <Link to="/dashboard/reports" as={ReactLink}>
        <Button
          w={isLargerThan1700 ? 24 : 16}
          h={isLargerThan1700 ? 24 : 16}
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsFillFileMedicalFill size={isLargerThan1700 ? "40px" : "30px"} />
          <Text mt={1} fontSize={isLargerThan1700 ? "2xl" : "md"}>
            病歷
          </Text>
        </Button>
      </Link>
      <Link to="/dashboard/posts" as={ReactLink}>
        <Button
          w={isLargerThan1700 ? 24 : 16}
          h={isLargerThan1700 ? 24 : 16}
          rounded="full"
          flexDir="column"
          p={2}
          onClick={props.closeDrawer}
        >
          <BsFillChatRightTextFill size={isLargerThan1700 ? "40px" : "30px"} />
          <Text mt={1} fontSize={isLargerThan1700 ? "2xl" : "md"}>
            快訊
          </Text>
        </Button>
      </Link>
    </>
  );
}
