import {
  Text,
  Divider,
  Button,
  FormControl,
  Heading,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../../redux/store";
import Swal from "sweetalert2";
import axios from "axios";
import locateToken from "../../../../utility/Token";
import { tokenThunk } from "../../../../redux/Thunk/tokenThunk";

const {
  REACT_APP_API_SERVER,
  REACT_APP_SMS_AC_ID,
  REACT_APP_PHONE_NUMBER,
  REACT_APP_SMS_API_KEY,
} = process.env;

export default function DietitianAccount() {
  // obtain data from redux
  const dispatch = useDispatch<AppDispatch>();
  const token = locateToken();

  const dietitianID = useSelector(
    (state: IRootState) => state.user.dietitian[0].id
  );

  const dietitianEmail = useSelector(
    (state: IRootState) => state.user.dietitian[0].email
  );
  const dietitianUserName = useSelector(
    (state: IRootState) => state.user.dietitian[0].username
  );
  const dietitianFirstName = useSelector(
    (state: IRootState) => state.user.dietitian[0].first_name
  );
  const dietitianLastName = useSelector(
    (state: IRootState) => state.user.dietitian[0].last_name
  );

  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  async function changeEmail() {
    await Swal.fire({
      title: "請輸入你的電郵",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "abc@example.com",
      showCloseButton: true,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/info/dietitianEmail`,
          {
            id: dietitianID,
            email: result.value,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        );
        if (results.data.success) {
          Swal.fire(`你的電郵已更改為: ${result.value}`);
          dispatch(tokenThunk(token as string));
        }
      }
    });
  }

  async function changeDietitianPassword() {
    await Swal.fire({
      title: "請輸入你的新密碼",
      input: "password",
      showCloseButton: true,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await axios.put(
          `${REACT_APP_API_SERVER}/user/dietitians/pw`,
          {
            id: dietitianID,
            password: result.value,
          },
          {
            headers: {
              Authorization: `Bearer ${locateToken()}`,
            },
          }
        );
        if (results.data.success) {
          Swal.fire(`你的密碼已更改,稍後會有短訊`).then(async()=>{
            await axios.post(
              `https://sms.8x8.com/api/v1/subaccounts/${REACT_APP_SMS_AC_ID}/messages`,
              {
                encoding: "AUTO",
                track: "None",
                destination: `${REACT_APP_PHONE_NUMBER}`,
                text: `你的新密碼${result.value}`
              },
              {
                headers: {
                  Authorization: `Bearer ${REACT_APP_SMS_API_KEY}`,
                },
              }
            );
          })
          dispatch(tokenThunk(token as string))
          
        }
      }
    })
  }

  return (
    <>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        maxH={isSmallerThan600 ? "min-content" : "auto"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          你的用戶資料
          <Divider mb={2} />
        </Heading>
        <FormControl id="userIcon">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size="xl"
                src={`https://i.pravatar.cc/500?img=${
                  dietitianID ? dietitianID : 100
                }`}
              >
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">更換頭像</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName">
          <Heading fontSize="lg">用戶名稱</Heading>
          <Text fontSize="xl" my="1">
            {dietitianUserName}
          </Text>
        </FormControl>

        <FormControl id="userName">
          <Heading fontSize="lg">姓名</Heading>
          <Text fontSize="xl" my="1">
            {dietitianFirstName + " " + dietitianLastName!}
          </Text>
        </FormControl>

        <FormControl id="email">
          <Heading fontSize="lg">電郵</Heading>
          <Text fontSize="xl" my="1">
            {dietitianEmail}
          </Text>
          <Button
            colorScheme="red"
            onClick={async () => {
              changeEmail();
            }}
          >
            更改
          </Button>
        </FormControl>

        <Button colorScheme="red" maxWidth={20} m={3} onClick={()=> {changeDietitianPassword()}}>
          更改密碼
        </Button>
      </Stack>
    </>
  );
}
