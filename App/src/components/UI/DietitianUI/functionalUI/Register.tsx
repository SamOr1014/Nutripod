import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import locateToken from "../../../../utility/Token";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
const {
  REACT_APP_API_SERVER,
  REACT_APP_SMS_AC_ID,
  REACT_APP_PHONE_NUMBER,
  REACT_APP_SMS_API_KEY,
} = process.env;
export default function Register() {
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <Flex
      minH={"100%"}
      align={"center"}
      justify={"center"}
      bg={bg}
      rounded={"3xl"}
    >
      <Stack spacing={2} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            η»θ¨η¨ζΆπ
          </Heading>
        </Stack>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            birthday: "",
            height: "",
            weight: "",
            phone: "",
            address: "",
            hkid: "",
            gender: "",
            profession: "",
            chronic_condition: "",
            education: "",
          }}
          onSubmit={(values, { resetForm }) => {
            axios
              .post(
                `${REACT_APP_API_SERVER}/user/register`,
                {
                  values,
                },
                {
                  headers: {
                    Authorization: `Bearer ${locateToken()}`,
                  },
                }
              )
              .then(async ({ data }) => {
                if (data.success) {
                  Swal.fire({
                    icon: "success",
                    title: "θ¨»εζε",
                    titleText: "η¨εΎζζη­θ¨ιη₯η¨ζΆεΆη»ε₯θ³θ¨",
                  });
                  await axios.post(
                    `https://sms.8x8.com/api/v1/subaccounts/${REACT_APP_SMS_AC_ID}/messages`,
                    {
                      encoding: "AUTO",
                      track: "None",
                      destination: `${REACT_APP_PHONE_NUMBER}`,
                      text: `δ½ ε·²ζεε¨nutripodιζΆοΌη¨ζΆε: ${data.username}οΌε―η’Ό: ${data.password}`,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${REACT_APP_SMS_API_KEY}`,
                      },
                    }
                  );
                  resetForm();
                }
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: `${error.response.data.message}`,
                });
              });
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <>
              <Form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <FormControl
                    isInvalid={
                      (!!errors.firstName || !!errors.lastName) &&
                      (touched.firstName || touched.lastName)
                    }
                  >
                    <HStack>
                      <Flex flexDir={"column"}>
                        <FormLabel fontSize={"sm"}>εοΌ</FormLabel>
                        <Field
                          as={Input}
                          name={"firstName"}
                          placeholder={"ε"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½ε§ε";
                            }
                            return error;
                          }}
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <FormLabel fontSize={"sm"}>ε§οΌ</FormLabel>
                        <Field
                          as={Input}
                          name={"lastName"}
                          placeholder={"ε§"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½ε§ε";
                            }
                            return error;
                          }}
                        />
                      </Flex>
                    </HStack>
                    <FormErrorMessage>
                      {errors.lastName || errors.firstName}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel fontSize={"sm"}>η¨ζΆεη¨±οΌ</FormLabel>
                    <Field
                      as={Input}
                      name={"username"}
                      placeholder={"η¨ζΆε"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (!value) {
                          error = "θ«η’Ίθͺδ½ ε‘«ε₯½η¨ζΆε";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormLabel fontSize={"sm"}>ι»ι΅οΌ</FormLabel>
                  <Field
                    as={Input}
                    name={"email"}
                    type={"email"}
                    placeholder={"ι»ι΅"}
                  />
                  <FormControl
                    isInvalid={!!errors.birthday && touched.birthday}
                  >
                    <FormLabel fontSize={"sm"}>εΊηζ₯οΌ</FormLabel>
                    <Field
                      as={Input}
                      type={"date"}
                      name={"birthday"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (!value) {
                          error = "θ«η’Ίθͺδ½ ε‘«ε₯½εΊηζ₯ζ";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.birthday}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      (!!errors.height || !!errors.height) &&
                      (touched.weight || touched.weight)
                    }
                  >
                    <HStack>
                      <Flex flexDir={"column"}>
                        <FormLabel fontSize={"sm"}>θΊ«ι«οΌ</FormLabel>
                        <Field
                          as={Input}
                          name={"height"}
                          placeholder={"θΊ«ι« cm"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value || isNaN(parseInt(value))) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½θΊ«ι«ι«ι";
                            }
                            return error;
                          }}
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <FormLabel fontSize={"sm"}>ι«ιοΌ</FormLabel>
                        <Field
                          as={Input}
                          name={"weight"}
                          placeholder={"ι«ι kg"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value || isNaN(parseInt(value))) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½θΊ«ι«ι«ι";
                            }
                            return error;
                          }}
                        />
                      </Flex>
                    </HStack>
                    <FormErrorMessage>
                      {errors.height || errors.weight}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.phone && touched.phone}>
                    <FormLabel fontSize={"sm"}>ι»θ©±οΌ</FormLabel>
                    <Field
                      as={Input}
                      name={"phone"}
                      placeholder={"ι»θ©±"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (
                          !value ||
                          !/^1[0-9]{10}$|^[569][0-9]{7}$/.test(value)
                        ) {
                          error = "θ«η’Ίθͺδ½ ε‘«ε₯½ι»θ©±";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>
                  <FormLabel fontSize={"sm"}>ε°εοΌ</FormLabel>
                  <Field as={Input} name={"address"} placeholder={"ε°ε"} />

                  <FormControl isInvalid={!!errors.hkid}>
                    <FormLabel fontSize={"sm"}>θΊ«εθ­οΌ</FormLabel>
                    <Field
                      as={Input}
                      name={"hkid"}
                      placeholder={"ι¦ζΈ―θΊ«εθ­θη’Ό"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (
                          !value ||
                          !/^[A-Z]{1,2}[0-9]{6}[0-9A]$/.test(value)
                        ) {
                          error = "θ«η’Ίθͺδ½ ε‘«ε₯½θΊ«δ»½θ­";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.hkid}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      (!!errors.gender ||
                        !!errors.education ||
                        !!errors.chronic_condition ||
                        !!errors.profession) &&
                      (touched.gender ||
                        touched.education ||
                        touched.chronic_condition ||
                        touched.profession)
                    }
                  >
                    <HStack>
                      <Flex flexDir={"column"} flex={1}>
                        <FormLabel fontSize={"xs"}>ζ§ε₯οΌ</FormLabel>
                        <Field
                          as={Select}
                          name={"gender"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½δ»₯δΈει ";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>η·</option>
                          <option value={"2"}>ε₯³</option>
                          <option value={"3"}>εΆδ»</option>
                        </Field>
                      </Flex>
                      <Flex flexDir={"column"} flex={1}>
                        <FormLabel fontSize={"xs"}>θ·ζ₯­οΌ</FormLabel>
                        <Field
                          as={Select}
                          name={"profession"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½δ»₯δΈει ";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>ε­Έη</option>
                          <option value={"2"}>ε»£εεεΈε ΄η­ε</option>
                          <option value={"3"}>ι»ε­η§ζ</option>
                          <option value={"4"}>ε»Ίη―</option>
                          <option value={"5"}>ζθ²</option>
                          <option value={"6"}>ζθ£εθθ‘</option>
                          <option value={"7"}>ιθειθ‘ζ₯­</option>
                          <option value={"8"}>ε·₯η¨</option>
                          <option value={"9"}>θ£½ι ζ₯­</option>
                          <option value={"10"}>ιεΊοΌζιοΌει€ι£²ζε</option>
                          <option value={"11"}>ιθΌΈ</option>
                          <option value={"12"}>ιΆε?ζ₯­</option>
                          <option value={"13"}>ιδΌ</option>
                          <option value={"14"}>εΆδ»</option>
                        </Field>
                      </Flex>
                      <Flex flexDir={"column"} flex={1}>
                        <FormLabel fontSize={"xs"}>ι·ζηζ£οΌ</FormLabel>
                        <Field
                          as={Select}
                          name={"chronic_condition"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½δ»₯δΈει ";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>η‘</option>
                          <option value={"2"}>η³ε°Ώη</option>
                          <option value={"3"}>ιη―η</option>
                          <option value={"4"}>εΏθη</option>
                          <option value={"5"}>ηη</option>
                          <option value={"6"}>εΌεΈη³»η΅±ηΎη</option>
                          <option value={"7"}>θ¦ιεη</option>
                          <option value={"8"}>θη</option>
                          <option value={"9"}>εΆδ»</option>
                        </Field>
                      </Flex>
                      <Flex flexDir={"column"} flex={1}>
                        <FormLabel fontSize={"xs"}>ζθ²η¨εΊ¦οΌ</FormLabel>
                        <Field
                          as={Select}
                          name={"education"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "θ«η’Ίθͺδ½ ε‘«ε₯½δ»₯δΈει ";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>ε°ε­Έεδ»₯δΈ</option>
                          <option value={"2"}>δΈ­ε­Έ</option>
                          <option value={"3"}>ι η§</option>
                          <option value={"4"}>ε­Έε£«</option>
                          <option value={"5"}>η’©ε£«</option>
                          <option value={"6"}>εε£«</option>
                        </Field>
                      </Flex>
                    </HStack>
                    <FormErrorMessage>
                      {errors.profession ||
                        errors.gender ||
                        errors.chronic_condition ||
                        errors.education}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    loadingText="Submitting"
                    type={"submit"}
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    η»θ¨
                  </Button>
                </Stack>
              </Form>
            </>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
