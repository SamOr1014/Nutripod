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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Select,
  Input,
  FormControl,
  FormErrorMessage,
  InputRightElement, InputGroup, useToast
} from "@chakra-ui/react";

import { MdToday } from "react-icons/md";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import "react-day-picker/dist/style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import locateToken from "../../../../utility/Token";
import { diet, exercise, searchFood } from "../../../../utility/models"
import { Formik, Field, Form } from 'formik';

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
.my-today { console.log("???")
  font-weight: bold;
  font-size: 100%; 
  color: red;
}
`;

export default function UserMain() {
  const toast = useToast()
  const userInfo = useSelector((state: IRootState) => state.user.user[0])
  const { isOpen: breakfastOpen, onOpen: breakfastOnOpen, onClose: breakfastOnClose } = useDisclosure()
  const { isOpen: lunchOpen, onOpen: lunchOnOpen, onClose: lunchOnClose } = useDisclosure()
  const { isOpen: dinnerOpen, onOpen: dinnerOnOpen, onClose: dinnerOnClose } = useDisclosure()
  const { isOpen: snackOpen, onOpen: snackOnOpen, onClose: snackOnClose } = useDisclosure()
  const { isOpen: exerciseOpen, onOpen: exercisesOnOpen, onClose: exerciseOnClose } = useDisclosure()
  const { isOpen: exerciseFormOpen, onOpen: exerciseFormOnOpen, onClose: exerciseFormOnClose } = useDisclosure()
  const { isOpen: foodFormOpen, onOpen: foodFormOnOpen, onClose: foodFormOnClose } = useDisclosure()

  const [hasSearchResult, setHasSearchResult] = useState(false)
  const [resultList, setResultFoodList] = useState(Array<searchFood>)

  const [calories, setCalories] = useState(0)
  const [twoDaysHasExercise, setTwoDaysHasExercises] = useState(false)
  const [yesterdayHasExercise, setYesterdayExercise] = useState(false)
  const [rate, setRate] = useState(0)

  const [averageCalories, setAverageCalories] = useState(0)
  const [lastMonthHasExercise, setLastMonthHasExercise] = useState(false)
  const [twoMonthsHasExercises, setTwoMonthsHasExercises] = useState(false)
  const [monthRate, SetMonthRate] = useState(0)

  const [inTake, setIntake] = useState(0)
  const [twoDaysHasIntake, setTwoDaysHasIntake] = useState(false)
  const [yesterdayHasIntake, setYesterdayHasIntake] = useState(false)
  const [intakeRate, setIntakeRate] = useState(0)

  const [averageIntake, setAverageIntake] = useState(0)
  const [twoMonthsHasIntake, setTwoMonthsHasIntake] = useState(false)
  const [lastMonthHasIntake, setLastMonthHasIntake] = useState(false)
  const [averageIntakeRate, setAverageIntakeRate] = useState(0)

  const [breakfastList, setBreakfastList] = useState(Array<diet>)
  const [hasBreakfast, setHasBreakfast] = useState(false)
  const [lunchList, setLunchList] = useState(Array<diet>)
  const [hasLunch, setHasLunch] = useState(false)
  const [dinnerList, setDinnerList] = useState(Array<diet>)
  const [hasDinner, setHasDinner] = useState(false)
  const [snackList, setSnackList] = useState(Array<diet>)
  const [hasSnack, setHasSnack] = useState(false)

  const [exerciseList, setExerciseList] = useState(Array<exercise>)
  const [hasExercise, setHasExercise] = useState(false)

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
        if (!data.hasExercises && data.message === "no exercise on both days") {
          setCalories(0)
          setRate(0)
          setTwoDaysHasExercises(false)
          setYesterdayExercise(false)
        } else if (!data.hasExercises && data.message === "No exercise for today") {
          setCalories(0)
          setRate(0)
          setYesterdayExercise(true)
          setTwoDaysHasExercises(false)
        }

        if (data.hasExercises) {
          setCalories(data.todayCalories)
          setHasExercise(true)
          for (let exercise of data.exercise) {
            let exerciseInfo: exercise = {
              id: exercise.id,
              name: exercise.ex_type,
              duration: parseInt(exercise.duration, 10),
              ex_calories: parseInt(exercise.ex_calories, 10),
              burn_calories: Math.round(parseInt(exercise.duration, 10) * parseInt(exercise.ex_calories, 10) / 60)
            }
            setExerciseList((previousList) => [...previousList, exerciseInfo])
          }

          if (data.rate) {
            setYesterdayExercise(true)
            setTwoDaysHasExercises(true)
            setRate(data.rate)
          } else if (!data.rate) {
            setYesterdayExercise(false)
            setTwoDaysHasExercises(false)
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
        if (!data.is_exercised && data.message === "No exercises in 2 months!") {
          setAverageCalories(0)
          setTwoMonthsHasExercises(false)
          setLastMonthHasExercise(false)
          SetMonthRate(0)
        } else if (!data.is_exercised && data.message === "No exercises in this months!") {
          setAverageCalories(0)
          setTwoMonthsHasExercises(false)
          setLastMonthHasExercise(true)
          SetMonthRate(0)
        }

        if (data.is_exercised) {
          setAverageCalories(data.averageCalories)
          if (data.rate) {
            setTwoMonthsHasExercises(true)
            setLastMonthHasExercise(true)
            SetMonthRate(data.rate)
          } else if (!data.rate) {
            setTwoMonthsHasExercises(false)
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

  async function fetchIntakeFromServer() {
    axios.get(`${REACT_APP_API_SERVER}/diet/dailyDiet/${userInfo.id}/${selectedDate?.toISOString()}`
      , {
        headers: {
          'Authorization': `Bearer ${locateToken()}`
        }
      }).then(({ data }) => {
        if (!data.inTake && data.message === "No Intake for two days") {
          setIntake(0)
          setIntakeRate(0)
          setYesterdayHasIntake(false)
          setTwoDaysHasIntake(false)
        } else if (!data.inTake && data.message === "No Intake for today") {
          setIntake(0)
          setIntakeRate(0)
          setYesterdayHasIntake(true)
          setTwoDaysHasIntake(false)
        }

        if (data.inTake) {
          setIntake(data.intakeCalories)
          if (data.rate) {
            setYesterdayHasIntake(true)
            setTwoDaysHasIntake(true)
            setIntakeRate(data.rate)
          } else if (!data.rate) {
            setYesterdayHasIntake(false)
            setTwoDaysHasIntake(false)
            setIntakeRate(0)
          }
        }

        if (data.diet) {
          for (let food of data.diet) {
            if (food.d_type === "breakfast") {
              setHasBreakfast(true)
              let breakfastInfo: diet = {
                id: food.id,
                name: food.food_name,
                food_group: food.food_group,
                food_amount: parseInt(food.food_amount, 10),
                food_calories: parseInt(food.food_calories, 10),
                food_intake: (parseInt(food.food_amount, 10) * parseInt(food.food_calories, 10)) / 100,
                carbohydrates: parseInt(food.carbohydrates, 10),
                protein: parseInt(food.protein, 10),
                fat: parseInt(food.fat, 10),
                sodium: parseInt(food.sodium, 10),
                sugars: parseInt(food.sugars, 10),
                fiber: parseInt(food.fiber, 10),
              }
              setBreakfastList((previousList) => [...previousList, breakfastInfo])

            } else if (food.d_type === "lunch") {
              setHasLunch(true)
              let lunchInfo: diet = {
                id: food.id,
                name: food.food_name,
                food_group: food.food_group,
                food_amount: parseInt(food.food_amount, 10),
                food_calories: parseInt(food.food_calories, 10),
                food_intake: (parseInt(food.food_amount, 10) * parseInt(food.food_calories, 10)) / 100,
                carbohydrates: parseInt(food.carbohydrates, 10),
                protein: parseInt(food.protein, 10),
                fat: parseInt(food.fat, 10),
                sodium: parseInt(food.sodium, 10),
                sugars: parseInt(food.sugars, 10),
                fiber: parseInt(food.fiber, 10),
              }
              setLunchList((previousList) => [...previousList, lunchInfo])

            } else if (food.d_type === "dinner") {
              setHasDinner(true)
              let dinnerInfo: diet = {
                id: food.id,
                name: food.food_name,
                food_group: food.food_group,
                food_amount: parseInt(food.food_amount, 10),
                food_calories: parseInt(food.food_calories, 10),
                food_intake: (parseInt(food.food_amount, 10) * parseInt(food.food_calories, 10)) / 100,
                carbohydrates: parseInt(food.carbohydrates, 10),
                protein: parseInt(food.protein, 10),
                fat: parseInt(food.fat, 10),
                sodium: parseInt(food.sodium, 10),
                sugars: parseInt(food.sugars, 10),
                fiber: parseInt(food.fiber, 10),
              }
              setDinnerList((previousList) => [...previousList, dinnerInfo])

            } else if (food.d_type === "snack") {
              setHasSnack(true)
              let snackInfo: diet = {
                id: food.id,
                name: food.food_name,
                food_group: food.food_group,
                food_amount: parseInt(food.food_amount, 10),
                food_calories: parseInt(food.food_calories, 10),
                food_intake: (parseInt(food.food_amount, 10) * parseInt(food.food_calories, 10)) / 100,
                carbohydrates: parseInt(food.carbohydrates, 10),
                protein: parseInt(food.protein, 10),
                fat: parseInt(food.fat, 10),
                sodium: parseInt(food.sodium, 10),
                sugars: parseInt(food.sugars, 10),
                fiber: parseInt(food.fiber, 10),
              }
              setSnackList((previousList) => [...previousList, snackInfo])
            }
          }
        }
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "發生錯誤，請稍後再試"
        })
      })
  }

  async function fetchMonthlyIntakeFromServer() {
    axios.get(`${REACT_APP_API_SERVER}/diet/monthlyDiet/${userInfo.id}/${selectedDate?.toISOString()}`
      , {
        headers: {
          'Authorization': `Bearer ${locateToken()}`
        }
      }).then(({ data }) => {
        if (!data.inTake && data.message === "No intake in 2 months!") {
          setAverageIntake(0)
          setAverageIntakeRate(0)
          setTwoMonthsHasIntake(false)
          setLastMonthHasIntake(false)
        } else if (!data.inTake && data.message === "No intake in this month!") {
          setAverageIntake(0)
          setAverageIntakeRate(0)
          setTwoMonthsHasIntake(false)
          setLastMonthHasIntake(true)
        }

        if (data.inTake) {
          setAverageIntake(data.thisMonthIntake)
          if (data.rate) {
            setAverageIntakeRate(data.rate)
            setTwoMonthsHasIntake(true)
            setLastMonthHasIntake(true)
          } else if (!data.rate) {
            setAverageIntakeRate(0)
            setTwoMonthsHasIntake(false)
            setLastMonthHasIntake(false)
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
    setExerciseList([])
    setHasExercise(false)
    setBreakfastList([])
    setHasBreakfast(false)
    setLunchList([])
    setHasLunch(false)
    setDinnerList([])
    setHasDinner(false)
    setSnackList([])
    setHasSnack(false)
    fetchExercisesFromServer()
    fetchMonthlyExercisesFromServer()
    fetchIntakeFromServer()
    fetchMonthlyIntakeFromServer()
  }, [selectedDate]);

  let lunch = 0
  let dinner = 0
  let snack = 0
  let breakfast = 0
  breakfastList.map((food) => breakfast += food.food_intake)
  lunchList.map((food) => lunch += food.food_intake)
  dinnerList.map((food) => dinner += food.food_intake)
  snackList.map((food) => snack += food.food_intake)

  //Insert later
  // const today = new Date();
  // disabled={selectedDate && { after: today }}

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
                  disabled={selectedDate}
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
          <Flex >
            <Heading flex={1} textAlign={"center"}>攝取統計📊</Heading>
            <Button gap={1} onClick={foodFormOnOpen}>
              <AddIcon />
            </Button>
          </Flex>

          {foodFormOpen ?
            <Center>
              <Modal isOpen={foodFormOpen} onClose={foodFormOnClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader textAlign={"center"}>請在此輸入膳食</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>

                    <Formik
                      initialValues={{
                        food: "",
                      }}
                      onSubmit={async (values) => {
                        axios.get(`${REACT_APP_API_SERVER}/diet/search/${values.food}`
                          , {
                            headers: {
                              'Authorization': `Bearer ${locateToken()}`
                            }
                          }).then(({ data }) => {
                            setResultFoodList([])
                            setHasSearchResult(true)
                            for (let searchResult of data.list) {
                              let food: searchFood = {
                                name: searchResult.food_name
                              }
                              setResultFoodList((previousList) => [...previousList, food])
                            }
                          }).catch((error) => {
                            toast({
                              position: 'top',
                              title: `${error.response.data.message}`,
                              duration: 3000,
                              isClosable: true,
                            })
                          })
                      }}
                    >
                      {({ handleSubmit,errors, touched }) => (

                        <Form onSubmit={handleSubmit}>

                          <FormControl isInvalid={!!errors.food && touched.food}>
                            <InputGroup size="md">
                              <Field
                                as={Input}
                                placeholder={"請輸入食物名稱"}
                                name="food"
                                validate={(name: string) => {
                                  let error;
                                  if (!name) {
                                    error = "請輸入食物名稱"
                                  }
                                  return error;
                                }}
                              />
                              <InputRightElement
                                pointerEvents="none"
                                color="gray.300"
                                children={<Search2Icon />}
                              />
                            </InputGroup>
                            <FormErrorMessage mt={3}>
                              {errors.food}
                            </FormErrorMessage>
                          </FormControl>

                          <Center
                            justifyContent="space-around"
                            mt={10}
                            hidden={hasSearchResult ? true : false}>
                            <Button
                              colorScheme='blue' mr={3} type="submit">
                              提交
                            </Button>
                            <Button
                              colorScheme='blue' mr={3} onClick={foodFormOnClose}>
                              Close
                            </Button>
                          </Center>
                        </Form>
                      )}
                    </Formik>

                    {hasSearchResult ?

                      <Formik
                        initialValues={{
                          food: resultList[0].name,
                          dietType: "breakfast",
                          amount: 0,
                          date: selectedDate,
                          userID: userInfo.id
                        }}
                        onSubmit={async (values, { resetForm }) => {
                          axios.post(`${REACT_APP_API_SERVER}/diet/foodIntake`
                            , {
                              values
                            },
                            {
                              headers: {
                                'Authorization': `Bearer ${locateToken()}`
                              }
                            }).then(({ data }) => {
                              if (data.success) {
                                resetForm()
                                setHasSearchResult(false)
                                foodFormOnClose()
                                fetchIntakeFromServer()
                                fetchMonthlyIntakeFromServer()
                                Swal.fire({
                                  icon: "success",
                                  title: `成立增加膳食資料`
                                })
                              }
                            }).catch((error) => {
                              resetForm()
                              setHasSearchResult(false)
                              foodFormOnClose()
                              Swal.fire({
                                icon: "error",
                                title: "發生錯誤，請稍後再試"
                              })
                            })
                        }}
                      >
                        {({ values, setFieldValue, handleSubmit, handleChange, errors, touched }) => (
                          <Form onSubmit={handleSubmit}>

                            <FormLabel mt={5}>搜查結果</FormLabel>
                            <Field
                              as={Select}
                              name='food'>
                              {resultList.map((result) => <option key={`foodResult_${result.name}`} value={result.name}>{result.name}</option>)}
                            </Field>

                            <FormLabel mt={2}>類型</FormLabel>
                            <Field
                              as={Select}
                              name='dietType'>
                              <option value="breakfast">早餐</option>
                              <option value="lunch">午餐</option>
                              <option value="dinner">晚餐</option>
                              <option value="snack">小食</option>
                            </Field>

                            <FormControl
                              isInvalid={!!errors.amount || touched.amount}>
                              <FormLabel mt={2}>分量(克)</FormLabel>
                              <Field
                                as={Input}
                                name='amount'
                                type='number'
                                min={1}
                                isRequired={true}
                                validate={(value: number) => {
                                  let error
                                  if (value < 0) {
                                    error = '請輸入正確的分量'
                                  }
                                  return error
                                }} />
                              <FormErrorMessage>{errors.amount}</FormErrorMessage>
                            </FormControl>

                            <Center
                              justifyContent="space-around"
                              mt={10}
                            >
                              <Button
                                colorScheme='blue' mr={3} type="submit">
                                提交
                              </Button>
                              <Button
                                colorScheme='blue' mr={3} onClick={() => {foodFormOnClose(); setHasSearchResult(false)}}>
                                Close
                              </Button>
                            </Center>
                          </Form>
                        )}
                      </Formik>
                      : <></>}
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Center>
            : <></>
          }

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

                <StatNumber>
                  {inTake > 0 ? `${inTake}kcal` : '還沒有記錄'}
                </StatNumber>

                <StatHelpText>
                  {twoDaysHasIntake ? "比前一日" : ""}

                  {twoDaysHasIntake ?
                    <StatArrow
                      type={intakeRate > 0 ? "increase" : "decrease"} /> :

                    yesterdayHasIntake ? "" : "昨天沒有記錄"
                  }

                  {intakeRate === 0 ? "" : `${intakeRate}%`}

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
                <StatNumber>{averageIntake > 0 ? `${averageIntake}kcal` : "沒有記錄"}</StatNumber>
                <StatHelpText>
                  {twoMonthsHasIntake ? "比前一個月" : ""}

                  {twoMonthsHasIntake ?
                    <StatArrow
                      type={averageIntake > 0 ? "increase" : "decrease"} /> :

                    lastMonthHasIntake ? "" : "上一個月沒有記錄"}

                  {averageIntakeRate === 0 ? "" : `${averageIntakeRate}%`}

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

            <Button onClick={exercisesOnOpen} gap={1}>
              <Text fontSize={"lg"}>記錄</Text>
            </Button>

            <Modal isOpen={exerciseOpen} onClose={exerciseOnClose}>
              <ModalOverlay />
              <ModalContent>
                <Button
                  position='absolute'
                  h='8'
                  left='2'
                  top='2'
                  colorScheme='blue'
                  onClick={exerciseFormOnOpen}>
                  <AddIcon />
                </Button>

                {exerciseFormOpen ?
                  <Modal isOpen={exerciseFormOpen} onClose={exerciseFormOnClose} blockScrollOnMount={false}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader textAlign={"center"}>請在此輸入今日的運動</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>

                        <Formik
                          initialValues={{
                            exercise: "慢跑",
                            duration: 0
                          }}
                          onSubmit={async (values,) => {
                            axios.post(`${REACT_APP_API_SERVER}/diet/exercises/${userInfo.id}/${selectedDate?.toISOString()}`, {
                              values
                            },
                              {
                                headers: {
                                  'Authorization': `Bearer ${locateToken()}`
                                }
                              }).then(({ data }) => {
                                if (data.success) {
                                  exerciseFormOnClose()
                                  exerciseOnClose()
                                  Swal.fire({
                                    icon: "success",
                                    title: "成功"
                                  })
                                  setExerciseList([])
                                  fetchExercisesFromServer()
                                  fetchMonthlyExercisesFromServer()
                                }
                              }).catch(() => {
                                exerciseFormOnClose()
                                exerciseOnClose()
                                Swal.fire({
                                  icon: "error",
                                  title: "發生錯誤，請稍後再試"
                                })
                              })
                          }}
                        >
                          {({ handleSubmit, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>

                              <FormLabel>運動</FormLabel>
                              <Field
                                as={Select}
                                name="exercise"
                                isRequired={true}>
                                <option value="慢跑">慢跑</option>
                                <option value="快跑">快跑</option>
                                <option value="足球">足球</option>
                                <option value="籃球">籃球</option>
                                <option value='游泳'>游泳</option>
                                <option value='行山'>行山</option>
                                <option value='自由搏擊'>自由搏擊</option>
                                <option value='健身'>健身</option>
                                <option value='踩單車'>踩單車</option>
                                <option value='獨木舟'>獨木舟</option>
                                <option value='乒乓球'>乒乓球</option>
                                <option value='網球'>網球</option>
                              </Field>


                              <FormControl
                                isInvalid={!!errors.duration || touched.duration}>
                                <FormLabel mt='2'>分鐘</FormLabel>
                                <Field
                                  as={Input}
                                  name='duration'
                                  type='number'
                                  min={1}
                                  isRequired={true}
                                  validate={(value: number) => {
                                    let error
                                    if (value < 0) {
                                      error = "請輸入運動時數"
                                    }
                                    return error
                                  }} />
                                <FormErrorMessage>{errors.duration}</FormErrorMessage>
                              </FormControl>


                              <Center
                                justifyContent="space-around"
                                mt={3}>
                                <Button
                                  colorScheme='blue' mr={3} type="submit">
                                  提交
                                </Button>
                                <Button
                                  colorScheme='blue' mr={3} onClick={() => {exerciseFormOnClose(); }}>
                                  Close
                                </Button>
                              </Center>
                            </Form>
                          )}
                        </Formik>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                  :
                  <></>}


                <ModalHeader mt='6' textAlign='center'>運動列表</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Accordion allowMultiple>

                    {hasExercise ?
                      exerciseList.map((exercise) =>
                      (
                        <AccordionItem key={`exercise_${exercise.id}`}>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                {exercise.name}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={5}>
                            {exercise.duration}分鐘 <br></br>
                            每60分鐘所消耗的卡路里: {exercise.ex_calories}kcal <br></br>
                            總共消耗的卡路里: {exercise.burn_calories}kcal
                          </AccordionPanel>
                        </AccordionItem>
                      )
                      )
                      : <ModalHeader textAlign='center'>無記錄</ModalHeader>
                    }
                  </Accordion>
                </ModalBody>
                <ModalFooter
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    ml='2.5'
                    colorScheme='blue' mr={3} onClick={exerciseOnClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>


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
                  {twoDaysHasExercise ? "比前一日" : ""}

                  {twoDaysHasExercise ?
                    <StatArrow
                      type={rate > 0 ? "increase" : "decrease"} /> :

                    yesterdayHasExercise ? "" : "昨天沒有運動"}

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
                <StatNumber>{averageCalories > 0 ? `${averageCalories}Kcal` : "今個月還沒有運動"}</StatNumber>
                <StatHelpText>
                  {twoMonthsHasExercises ? "比前一個月" : ""}

                  {twoMonthsHasExercises ?
                    <StatArrow
                      type={monthRate > 0 ? "increase" : "decrease"} /> :

                    lastMonthHasExercise ? "" : "上一個月沒有運動"}

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
          onClick={breakfastOnOpen}
        >
          <Image
            boxSize={isSmallerThan600 ? 8 : 20}
            src="/images/breakfast.png"
          />

          <Modal isOpen={breakfastOpen} onClose={breakfastOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader mt='2' textAlign='center'>早餐</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Accordion allowMultiple>

                  {hasBreakfast ?
                    breakfastList.map((food) =>
                    (
                      <AccordionItem key={`breakfast_${food.id}`}>
                        <h2>
                          <AccordionButton>
                            <Box flex='1' textAlign='left'>
                              {food.name}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={5}>
                          種類: {food.food_group}<br></br>
                          分量: {food.food_amount}g<br></br>
                          每一百克卡路里： {food.food_calories}kcal<br></br>
                          攝入卡路里：{food.food_intake}kcal<br></br>
                          碳水化合物: {food.carbohydrates}g<br></br>
                          糖分: {food.sugars}g<br></br>
                          脂肪: {food.fat}g<br></br>
                          蛋白質: {food.protein}g<br></br>
                          膳食纖維: {food.fiber}g<br></br>
                          鈉: {food.sodium}ng<br></br>
                        </AccordionPanel>
                      </AccordionItem>
                    )
                    )
                    : <ModalHeader textAlign='center'>無記錄</ModalHeader>
                  }
                </Accordion>
              </ModalBody>
              <ModalFooter
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  ml='2.5'
                  colorScheme='blue' mr={3} onClick={breakfastOnClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>早餐</Heading>
          <Text fontWeight="bold" fontSize={isSmallerThan600 ? "md" : "xl"}>
            {breakfast} kcal</Text>
          <Button onClick={breakfastOnOpen} my={2} gap={1}>
            <Text fontSize="lg">記錄</Text>
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
          onClick={lunchOnOpen}
        >
          <Image boxSize={isSmallerThan600 ? 8 : 20} src="/images/lunch.png" />

          <Modal isOpen={lunchOpen} onClose={lunchOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader mt='2' textAlign='center'>午餐</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Accordion allowMultiple>
                  {hasLunch ?
                    lunchList.map((food) =>
                    (
                      <AccordionItem key={`lunch_${food.id}`}>
                        <h2>
                          <AccordionButton>
                            <Box flex='1' textAlign='left'>
                              {food.name}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={5}>
                          種類: {food.food_group}<br></br>
                          分量: {food.food_amount}g<br></br>
                          每一百克卡路里： {food.food_calories}kcal<br></br>
                          攝入卡路里：{food.food_intake}kcal<br></br>
                          碳水化合物: {food.carbohydrates}g<br></br>
                          糖分: {food.sugars}g<br></br>
                          脂肪: {food.fat}g<br></br>
                          蛋白質: {food.protein}g<br></br>
                          膳食纖維: {food.fiber}g<br></br>
                          鈉: {food.sodium}ng<br></br>
                        </AccordionPanel>
                      </AccordionItem>
                    )
                    )
                    : <ModalHeader textAlign='center'>無記錄</ModalHeader>
                  }
                </Accordion>
              </ModalBody>
              <ModalFooter
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  ml='2.5'
                  colorScheme='blue' mr={3} onClick={lunchOnClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>午餐</Heading>
          <Text fontWeight="bold" fontSize={isSmallerThan600 ? "md" : "xl"}>
            {lunch} kcal</Text>
          <Button onClick={lunchOnOpen} my={2} gap={1}>
            <Text fontSize="lg">記錄</Text>
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
          onClick={dinnerOnOpen}
        >
          <Image boxSize={isSmallerThan600 ? 8 : 20} src="/images/dinner.png" />

          <Modal isOpen={dinnerOpen} onClose={dinnerOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader mt='2' textAlign='center'>晚餐</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Accordion allowMultiple>
                  {hasDinner ?
                    dinnerList.map((food) => (
                      <AccordionItem key={`dinner_${food.id}`}>
                        <h2>
                          <AccordionButton>
                            <Box flex='1' textAlign='left'>
                              {food.name}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={5}>
                          種類: {food.food_group}<br></br>
                          分量: {food.food_amount}g<br></br>
                          每一百克卡路里： {food.food_calories}kcal<br></br>
                          攝入卡路里：{food.food_intake}kcal<br></br>
                          碳水化合物: {food.carbohydrates}g<br></br>
                          糖分: {food.sugars}g<br></br>
                          脂肪: {food.fat}g<br></br>
                          蛋白質: {food.protein}g<br></br>
                          膳食纖維: {food.fiber}g<br></br>
                          鈉: {food.sodium}ng<br></br>
                        </AccordionPanel>
                      </AccordionItem>
                    )
                    )
                    : <ModalHeader textAlign='center'>無記錄</ModalHeader>
                  }
                </Accordion>
              </ModalBody>
              <ModalFooter
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  ml='2.5'
                  colorScheme='blue' mr={3} onClick={dinnerOnClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>晚餐</Heading>
          <Text fontWeight="bold" fontSize={isSmallerThan600 ? "md" : "xl"}>
            {dinner} kcal</Text>
          <Button onClick={dinnerOnOpen} my={2} gap={1}>
            <Text fontSize="lg">記錄</Text>
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
          onClick={snackOnOpen}
        >
          <Image boxSize={isSmallerThan600 ? 8 : 20} src="/images/snack.png" />


          <Modal isOpen={snackOpen} onClose={snackOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader mt='2' textAlign='center'>小食</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Accordion allowMultiple>
                  {hasSnack ?
                    snackList.map((food) =>
                    (
                      <AccordionItem key={`snack_${food.id}`}>
                        <h2>
                          <AccordionButton>
                            <Box flex='1' textAlign='left'>
                              {food.name}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={5}>
                          種類: {food.food_group}<br></br>
                          分量: {food.food_amount}g<br></br>
                          每一百克卡路里： {food.food_calories}kcal<br></br>
                          攝入卡路里：{food.food_intake}kcal<br></br>
                          碳水化合物: {food.carbohydrates}g<br></br>
                          糖分: {food.sugars}g<br></br>
                          脂肪: {food.fat}g<br></br>
                          蛋白質: {food.protein}g<br></br>
                          膳食纖維: {food.fiber}g<br></br>
                          鈉: {food.sodium}ng<br></br>
                        </AccordionPanel>
                      </AccordionItem>
                    )
                    )
                    : <ModalHeader textAlign='center'>無記錄</ModalHeader>
                  }
                </Accordion>
              </ModalBody>
              <ModalFooter
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  ml='2.5'
                  colorScheme='blue' mr={3} onClick={snackOnClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Heading fontSize={isSmallerThan600 ? "md" : "xl"}>小食</Heading>
          <Text fontWeight="bold" fontSize={isSmallerThan600 ? "md" : "xl"}>
            {snack} kcal</Text>
          <Button onClick={snackOnOpen} my={2} gap={1}>
            <Text fontSize="lg">記錄</Text>
          </Button>
        </Box>
      </Flex>
    </>
  );
}
function toast(arg0: { position: string; title: string; duration: number; isClosable: boolean; }) {
  throw new Error("Function not implemented.");
}

