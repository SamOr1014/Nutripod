import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../../../../redux/store";
import { UserDetailInDietiainPanel } from "../../../../utility/models";
import locateToken from "../../../../utility/Token";
import DietitianPatientDetailPanel from "./sub-components/DietitianPatientDetailPanel";
const { REACT_APP_API_SERVER } = process.env;

export default function PatientSearchPanel() {
  const [userInfo, setUserinfo] = useState<Array<UserDetailInDietiainPanel>>(
    []
  );
  const isSmallerThan600 = useMediaQuery("max-width: 600px");
  const checkToken = sessionStorage.getItem("searchUserToken");
  const dietitianUsername = useSelector(
    (state: IRootState) => state.user.dietitian[0].username as string
  );

  async function searchUserByHKID(hkid: string) {
    await Swal.fire({
      title: "請輸入你的密碼",
      input: "password",
      showCloseButton: true,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${REACT_APP_API_SERVER}/user/verify`,
            {
              username: dietitianUsername,
              password: result.value,
            },
            {
              headers: {
                Authorization: `Bearer ${locateToken()}`,
              },
            }
          )
          .then(({ data }) => {
            if (data.success) {
              sessionStorage.setItem("searchUserToken", "verified");
              axios
                .get(`${REACT_APP_API_SERVER}/user/hkid/${hkid}`, {
                  headers: {
                    Authorization: `Bearer ${locateToken()}`,
                  },
                })
                .then(({ data }) => {
                  if (!data.user[0]) {
                    Swal.fire({
                      icon: "question",
                      title: "無此用戶",
                    });
                  }
                  setUserinfo(data.user);
                })
                .catch((e) => {
                  Swal.fire({
                    icon: "error",
                    title: "發生錯誤，請稍後再試",
                  });
                });
            } else if (!data.success) {
              Swal.fire({
                icon: "error",
                title: "密碼錯誤",
              });
            }
          });
      }
    });
  }

  async function checkTokenBeforeSearch(hkid: string) {
    if (checkToken === null) {
      searchUserByHKID(hkid);
    } else if (checkToken === "verified") {
      axios
        .get(`${REACT_APP_API_SERVER}/user/hkid/${hkid}`, {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        })
        .then(({ data }) => {
          if (!data.user[0]) {
            Swal.fire({
              icon: "question",
              title: "無此用戶",
            });
          }
          setUserinfo(data.user);
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "發生錯誤，請稍後再試",
          });
        });
    }
  }

  interface SearchValue {
    hkid: string;
  }
  const initialValues: SearchValue = { hkid: "" };

  return (
    <>
      <Flex
        w={"100%"}
        alignItems={"center"}
        gap={3}
        justifyContent={"center"}
        flexDir={"row"}
        h={12}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            checkTokenBeforeSearch(values.hkid);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!!errors.hkid && touched.hkid}>
                <InputGroup size="md">
                  <Field
                    as={Input}
                    placeholder={"請輸入HKID"}
                    id="hkid"
                    type={"password"}
                    name="hkid"
                    validate={(value: string) => {
                      let error;

                      if (!value) {
                        error = "Please Input HKID";
                      } else if (!/^[A-Z]{1,2}[0-9]{6}[0-9A]$/.test(value)) {
                        error = "HKID format is Wrong";
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
                <FormErrorMessage mt={isSmallerThan600 ? 0 : -10}>
                  {errors.hkid}
                </FormErrorMessage>
              </FormControl>
            </form>
          )}
        </Formik>
      </Flex>
      <Flex gap={5} flexDir={"column"} w={"100%"}>
        {/* Patient Detail Panel */}
        <Flex
          maxHeight={"100%"}
          w={"100%"}
          flex={1}
          mt={isSmallerThan600 ? 0 : -10}
        >
          {userInfo.map((item) => {
            if (!item.id) {
              return <></>;
            }
            return (
              <DietitianPatientDetailPanel
                key={`Dietitian_user_search_panel`}
                id={userInfo[0].id}
                first_name={userInfo[0].first_name}
                last_name={userInfo[0].last_name}
                height={userInfo[0].height}
                weight={userInfo[0].weight}
                gender={userInfo[0].gender}
                HKID={userInfo[0].hkid}
                phone={userInfo[0].phone}
                birthday={userInfo[0].birthday}
              />
            );
          })}
        </Flex>
      </Flex>
    </>
  );
}
