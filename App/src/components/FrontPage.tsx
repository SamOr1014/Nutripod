import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  useBreakpointValue,
  Text,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";

export default function FrontPage() {
  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://img.freepik.com/free-photo/young-asia-female-doctor-white-medical-uniform-using-clipboard-is-delivering-great-news-talk-discuss-results_7861-3135.jpg?w=2000&t=st=1663438900~exp=1663439500~hmac=dd21c3a2d8b864e140d8ac286c0def5cc9817ee9aee6429f36924f6bac46f24e"
            }
          />
        </Flex>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              {" "}
              <Image src="/logo.png" boxSize={"3xs"} />
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                NutriPOD
              </Text>
            </Heading>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text color={"blue.400"} as={"span"}>
                專業的營養諮詢
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              我們提供專業的營養治療及專業的系統去助你建立好的飲食及運動習慣，歡迎加入我們。
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Link as={ReactLink} to="/login">
                <Button
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  登入
                </Button>
              </Link>
              <Popover placement="right">
                <PopoverTrigger>
                  <Button rounded={"full"}>聯絡我們</Button>
                </PopoverTrigger>
                <PopoverContent
                  w={"min-content"}
                  bg="blue.800"
                  borderColor="blue.800"
                >
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader border="0">聯絡方式</PopoverHeader>
                  <PopoverBody>
                    <Stack>
                      <Link as={ReactLink} to="/">
                        <Button
                          leftIcon={<EmailIcon />}
                          colorScheme="teal"
                          variant="solid"
                          w={"32"}
                        >
                          電郵
                        </Button>
                      </Link>
                      <Link href="https://www.facebook.com/" isExternal>
                        <Button
                          colorScheme="facebook"
                          leftIcon={<FaFacebook />}
                          w={"32"}
                        >
                          Facebook
                        </Button>
                      </Link>
                      <Link href="https://twitter.com/" isExternal>
                        <Button
                          colorScheme="twitter"
                          leftIcon={<FaTwitter />}
                          w={"32"}
                        >
                          Twitter
                        </Button>
                      </Link>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
