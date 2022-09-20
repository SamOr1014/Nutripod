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
const { REACT_APP_API_SERVER } = process.env;
export default function Register() {
  return (
    <Flex
      minH={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.500")}
      rounded={"lg"}
    >
      <Stack spacing={2} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            登記用戶📖
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
          onSubmit={(values) => {
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
              .then(({ data }) => {
                if (data.success) {
                  Swal.fire({
                    icon: "success",
                    title: "成功",
                    titleText: `密碼: ${data.password}`,
                  });
                }
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "發生錯誤，請稍後再試",
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
                        <FormLabel fontSize={"sm"}>名：</FormLabel>
                        <Field
                          as={Input}
                          name={"firstName"}
                          placeholder={"名"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "請確認你填好姓名";
                            }
                            return error;
                          }}
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <FormLabel fontSize={"sm"}>姓：</FormLabel>
                        <Field
                          as={Input}
                          name={"lastName"}
                          placeholder={"姓"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "請確認你填好姓名";
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
                    <FormLabel fontSize={"sm"}>用戶名稱：</FormLabel>
                    <Field
                      as={Input}
                      name={"username"}
                      placeholder={"用戶名"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (!value) {
                          error = "請確認你填好用戶名";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormLabel fontSize={"sm"}>電郵：</FormLabel>
                  <Field
                    as={Input}
                    name={"email"}
                    type={"email"}
                    placeholder={"電郵"}
                  />
                  <FormControl
                    isInvalid={!!errors.birthday && touched.birthday}
                  >
                    <FormLabel fontSize={"sm"}>出生日：</FormLabel>
                    <Field
                      as={Input}
                      type={"date"}
                      name={"birthday"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (!value) {
                          error = "請確認你填好出生日期";
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
                        <FormLabel fontSize={"sm"}>身高：</FormLabel>
                        <Field
                          as={Input}
                          name={"height"}
                          placeholder={"身高 cm"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value || isNaN(parseInt(value))) {
                              error = "請確認你填好身高體重";
                            }
                            return error;
                          }}
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <FormLabel fontSize={"sm"}>體重：</FormLabel>
                        <Field
                          as={Input}
                          name={"weight"}
                          placeholder={"體重 kg"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value || isNaN(parseInt(value))) {
                              error = "請確認你填好身高體重";
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
                    <FormLabel fontSize={"sm"}>電話：</FormLabel>
                    <Field
                      as={Input}
                      name={"phone"}
                      placeholder={"電話"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (
                          !value ||
                          !/^1[0-9]{10}$|^[569][0-9]{7}$/.test(value)
                        ) {
                          error = "請確認你填好電話";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>
                  <FormLabel fontSize={"sm"}>地址：</FormLabel>
                  <Field as={Input} name={"address"} placeholder={"地址"} />

                  <FormControl isInvalid={!!errors.hkid}>
                    <FormLabel fontSize={"sm"}>身分證：</FormLabel>
                    <Field
                      as={Input}
                      name={"hkid"}
                      placeholder={"香港身分證號碼"}
                      isRequired={true}
                      validate={(value: string) => {
                        let error;
                        if (
                          !value ||
                          !/^[A-Z]{1,2}[0-9]{6}[0-9A]$/.test(value)
                        ) {
                          error = "請確認你填好身份證";
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
                        <FormLabel fontSize={"xs"}>性別：</FormLabel>
                        <Field
                          as={Select}
                          name={"gender"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "請確認你填好以上四項";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>男</option>
                          <option value={"2"}>女</option>
                          <option value={"3"}>其他</option>
                        </Field>
                      </Flex>
                      <Flex flexDir={"column"} flex={1}>
                        <FormLabel fontSize={"xs"}>職業：</FormLabel>
                        <Field
                          as={Select}
                          name={"profession"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "請確認你填好以上四項";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>學生</option>
                          <option value={"2"}>廣告及市場策劃</option>
                          <option value={"3"}>電子科技</option>
                          <option value={"4"}>建築</option>
                          <option value={"5"}>教育</option>
                          <option value={"6"}>時裝及藝術</option>
                          <option value={"7"}>金融及銀行業</option>
                          <option value={"8"}>工程</option>
                          <option value={"9"}>製造業</option>
                          <option value={"10"}>酒店，旅遊，及餐飲服務</option>
                          <option value={"11"}>運輸</option>
                          <option value={"12"}>零售業</option>
                          <option value={"13"}>退休</option>
                          <option value={"14"}>其他</option>
                        </Field>
                      </Flex>
                      <Flex flexDir={"column"} flex={1}>
                        <FormLabel fontSize={"xs"}>長期病患：</FormLabel>
                        <Field
                          as={Select}
                          name={"chronic_condition"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "請確認你填好以上四項";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>無</option>
                          <option value={"2"}>糖尿病</option>
                          <option value={"3"}>關節炎</option>
                          <option value={"4"}>心臟病</option>
                          <option value={"5"}>癌症</option>
                          <option value={"6"}>呼吸系統疾病</option>
                          <option value={"7"}>腦退化症</option>
                          <option value={"8"}>腎病</option>
                          <option value={"9"}>其他</option>
                        </Field>
                      </Flex>
                      <Flex flexDir={"column"} flex={1}>
                        <FormLabel fontSize={"xs"}>教育程度：</FormLabel>
                        <Field
                          as={Select}
                          name={"education"}
                          isRequired={true}
                          validate={(value: string) => {
                            let error;
                            if (!value) {
                              error = "請確認你填好以上四項";
                            }
                            return error;
                          }}
                        >
                          <option value={""}></option>
                          <option value={"1"}>小學及以下</option>
                          <option value={"2"}>中學</option>
                          <option value={"3"}>預科</option>
                          <option value={"4"}>學士</option>
                          <option value={"5"}>碩士</option>
                          <option value={"6"}>博士</option>
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
                    登記
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
