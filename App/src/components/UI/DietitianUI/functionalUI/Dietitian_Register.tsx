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
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import locateToken from "../../../../utility/Token";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
const { REACT_APP_API_SERVER } = process.env;
export default function Register() {
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <Flex h={"min-content"} bg={bg} rounded={"3xl"}>
      <Stack spacing={2} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            登記營養師👩🏻‍⚕️
          </Heading>
        </Stack>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            axios
              .post(
                `${REACT_APP_API_SERVER}/user/dietitians`,
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
                    title: "註冊成功",
                  });
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
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel fontSize={"sm"}>電郵：</FormLabel>
                    <Field
                      as={Input}
                      name={"email"}
                      type={"email"}
                      placeholder={"電郵"}
                      validate={(value: string) => {
                        let error;
                        if (!value) {
                          error = "請確認你填好電郵";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>
                      {errors.email || errors.email}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel fontSize={"sm"}>密碼：</FormLabel>
                    <Field
                      as={Input}
                      name={"password"}
                      type={"password"}
                      placeholder={"密碼"}
                      validate={(value: string) => {
                        let error;
                        if (!value) {
                          error = "請確認你填好密碼";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>
                      {errors.password || errors.password}
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
