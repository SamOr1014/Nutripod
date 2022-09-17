import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import { MdToday } from "react-icons/md";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AddIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import "react-day-picker/dist/style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import locateToken from "../../../../utility/Token";
const { REACT_APP_API_SERVER } = process.env;
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

export default function UserMain() {

  const userInfo = useSelector((state: IRootState) => state.user.user[0])

  const [calories, setCalories] = useState(0)
  const [yesterdayHasExercise, setYesterdayExercise] = useState(false)
  const [rate, setRate] = useState(0)

  const [averageCalories, setAverageCalories] = useState(0)
  const [lastMonthHasExercise, setLastMonthHasExercise] = useState(false)
  const [monthRate, SetMonthRate] = useState(0)



  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  async function fetchExercisesFromServer() {
    axios
      .get(
        `${REACT_APP_API_SERVER}/diet/exercises/${userInfo.id}/${selectedDate?.toISOString()}`
        , {
          headers: {
            'Authorization': `Bearer ${locateToken()}`
          }
        }
      )
      .then(({ data }) => {
        if (!data.hasExercises) {
          setCalories(0)
          setYesterdayExercise(false)
          setRate(0)
        }
        if (data.hasExercises) {
          setCalories(data.todayCalories)
          if (data.rate) {
            setYesterdayExercise(true)
            setRate(data.rate)
          } else if (!data.rate) {
            setYesterdayExercise(false)
            setRate(0)
          }
        }
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "發生錯誤，請稍後再試"
        })
      })
  }

  async function fetchMonthlyExercisesFromServer() {
    axios.get(`${REACT_APP_API_SERVER}/diet/monthlyExercises/${userInfo.id}/${selectedDate?.toISOString()}`
      , {
        headers: {
          'Authorization': `Bearer ${locateToken()}`
        }
      }
    )
      .then(({ data }) => {
        if (!data.is_exercised) {
          setAverageCalories(0)
          setLastMonthHasExercise(false)
          SetMonthRate(0)
        }

        if (data.is_exercised) {
          setAverageCalories(data.averageCalories)
          if (data.rate){
            setLastMonthHasExercise(true)
            SetMonthRate(data.rate)
          } else if (!data.rate) {
            setLastMonthHasExercise(false)
            SetMonthRate(0)
          }
        }
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "發生錯誤，請稍後再試"
        })
      })
  }

  useEffect(() => {
    fetchExercisesFromServer()
    fetchMonthlyExercisesFromServer()
  }, [selectedDate]);

  return (
    <>
      <style>{css}</style>
      <Flex alignSelf={"center"} justifyContent={"center"} w="100%">
        <Popover>
          <PopoverTrigger>
            <Box as="button" fontSize={"4xl"} fontWeight={"extrabold"}>
              {selectedDate?.toLocaleDateString()} 📅
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontSize={"3xL"} display={"flex"}>
              <Text>請選擇想查看的日期</Text>
            </PopoverHeader>
            <PopoverBody>
              <Flex justifyContent={"center"} mb={-6}>
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
              <Button
                onClick={() => setSelectedDate(new Date())}
                display={"flex"}
                flexDir={"column"}
              >
                <MdToday />
                今日
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Flex
        flexWrap={"wrap"}
        w={"100%"}
        justifyContent={isSmallerThan600 ? "center" : "space-between"}
        gap={2}
        mb={2}
      >
        <Flex
          flexDir={"column"}
          p={4}
          borderRadius={"3xl"}
          bg={"gray.500"}
          minW={isLargerThan1700 ? "48%" : isSmallerThan600 ? "100%" : "46%"}
          minH={isLargerThan1700 ? "300px" : "250px"}
        >
          <Heading textAlign={"center"}>攝取統計📊</Heading>
          <Divider my={3} />
          <Center flex={1} justifyContent={"center"}>
            <StatGroup flex={"1 1 0%"}>
              <Stat textAlign={"center"}>
                <StatLabel justifyContent={"center"} display={"flex"}>
                  <Image
                    boxSize={"100px"}
                    objectFit={"scale-down"}
                    src="https://3.bp.blogspot.com/-DVesu5jkbJY/V-SzHXVJrVI/AAAAAAAA-D8/S2GvFrXsOvMT7IwOjZHsa2VM83Q9LZSVACLcB/s400/syokuji_girl.png"
                  />
                </StatLabel>
                <StatLabel>本日攝取量📈</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比前一日
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat textAlign={"center"}>
                <StatLabel justifyContent={"center"} display={"flex"}>
                  <Image
                    boxSize={"100px"}
                    objectFit={"scale-down"}
                    src="https://4.bp.blogspot.com/-M4s-kw3pnK4/VVGU_vRA5ZI/AAAAAAAAtgc/gurhjQK24X0/s400/diet_after_woman.png"
                  />
                </StatLabel>
                <StatLabel>本月平均攝取量📈</StatLabel>
                <StatNumber>345,670kcal</StatNumber>
                <StatHelpText>
                  比上月
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Center>
        </Flex>
        <Flex
          flexDir={"column"}
          p={4}
          borderRadius={"3xl"}
          bg={"gray.500"}
          minW={isLargerThan1700 ? "48%" : isSmallerThan600 ? "100%" : "46%"}
          minH={isLargerThan1700 ? "300px" : "250px"}
        >
          <Flex>
            <Heading
              flex={1}
              textAlign={"center"}
              ml={isSmallerThan600 ? "40px" : "81px"}
            >
              運動統計🏃🏻‍♀️
            </Heading>
            <Button gap={1}>
              <AddIcon />
              <Text fontSize={"lg"}>{isSmallerThan600 ? "" : "記錄"}</Text>
            </Button>
          </Flex>
          <Divider my={3} />
          <Center flex={1} justifyContent={"center"}>
            <StatGroup flex={"1 1 0%"}>
              <Stat textAlign={"center"}>
                <StatLabel justifyContent={"center"} display={"flex"}>
                  <Image
                    boxSize={"100px"}
                    objectFit={"scale-down"}
                    src="https://2.bp.blogspot.com/-HNXSoXEM1h4/XLAdkaFXsXI/AAAAAAABSZc/sg3hQKBIFC8HsYpjS2mVnCa9hyFlSyBkACLcBGAs/s450/undou_back_press_man.png"
                  />
                </StatLabel>
                <StatLabel>
                  <Text>本日運動消耗量📈</Text>
                </StatLabel>

                <StatNumber>{calories > 0 ? `${calories}Kcal` : "今天還沒有運動"}</StatNumber>

                <StatHelpText>
                  {yesterdayHasExercise ? "比前一日" : "昨天沒有運動"}

                  {yesterdayHasExercise ?
                    <StatArrow
                      type={rate > 0 ? "increase" : "decrease"} />
                    :
                    <></>
                  }

                  {rate === 0 ? "" : `${rate}%`}
                </StatHelpText>

              </Stat>
              <Stat textAlign={"center"}>
                <StatLabel justifyContent={"center"} display={"flex"}>
                  <Image
                    boxSize={"100px"}
                    objectFit={"scale-down"}
                    src="https://4.bp.blogspot.com/-MeaPmMfyFEU/ViipeRRGWxI/AAAAAAAAz5Q/ZJ78UMjZfuQ/s450/shibou_nensyou.png"
                  />
                </StatLabel>
                <StatLabel>平均每月每日運動消耗量📈</StatLabel>
                <StatNumber>{averageCalories > 0 ? `${averageCalories}Kcal` : "今個月沒有運動"}</StatNumber>
                <StatHelpText>
                  { lastMonthHasExercise ? "比前一個月" : "上一個月沒有運動"}

                  {lastMonthHasExercise ?
                    <StatArrow
                      type={ monthRate > 0 ? "increase" : "decrease"} />
                    :
                    <></>
                  }
                  {monthRate === 0 ? "" : `${monthRate}%`}

                </StatHelpText>
              </Stat>
            </StatGroup>
          </Center>
        </Flex>
      </Flex>
      <Divider my={2} />
      <Flex
        flexWrap={"wrap"}
        w={"100%"}
        gap={2}
        justifyContent={isSmallerThan600 ? "center" : "space-between"}
      >
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          h={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Image
            boxSize={isSmallerThan600 ? 8 : 20}
            src="/images/breakfast.png"
          />
          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>早餐</Heading>
          <Text fontSize={isSmallerThan600 ? "md" : "xl"}>500kcal</Text>
          <Button my={2} gap={1}>
            <AddIcon />
            <Text fontSize={"lg"}>{isSmallerThan600 ? "" : "記錄"}</Text>
          </Button>
        </Box>
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          w={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          h={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          justifyContent={"center"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Image boxSize={isSmallerThan600 ? 8 : 20} src="/images/lunch.png" />
          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>午餐</Heading>
          <Text fontSize={isSmallerThan600 ? "md" : "xl"}>500kcal</Text>
          <Button my={2} gap={1}>
            <AddIcon />
            <Text fontSize={"lg"}>{isSmallerThan600 ? "" : "記錄"}</Text>
          </Button>
        </Box>
        <Box
          rounded={"3xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          h={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Image boxSize={isSmallerThan600 ? 8 : 20} src="/images/dinner.png" />
          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>晚餐</Heading>
          <Text fontSize={isSmallerThan600 ? "md" : "xl"}>500kcal</Text>
          <Button my={2} gap={1}>
            <AddIcon />
            <Text fontSize={"lg"}>{isSmallerThan600 ? "" : "記錄"}</Text>
          </Button>
        </Box>
        <Box
          display={"flex"}
          rounded={"3xl"}
          alignItems={"center"}
          justifyContent={"center"}
          w={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          h={isSmallerThan600 ? "170px" : isLargerThan1700 ? "xs" : "2xs"}
          _hover={{
            boxShadow: "0 0 5px 5px",
          }}
          bg={"gray.500"}
          flexDir={"column"}
        >
          <Image boxSize={isSmallerThan600 ? 8 : 20} src="/images/snack.png" />
          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>小食</Heading>
          <Text fontSize={isSmallerThan600 ? "md" : "xl"}>500kcal</Text>
          <Button my={2} gap={1}>
            <AddIcon />
            <Text fontSize={"lg"}>{isSmallerThan600 ? "" : "記錄"}</Text>
          </Button>
        </Box>
      </Flex>
    </>
  );
}
