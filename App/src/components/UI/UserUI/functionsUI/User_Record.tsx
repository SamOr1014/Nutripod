import {
  Button,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useMediaQuery,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../../../../redux/store";
import { BGDetail, BPDetail, WeightDetail } from "../../../../utility/models";
import locateToken from "../../../../utility/Token";
const { REACT_APP_API_SERVER } = process.env;

export default function UserBPBGRecord() {
  const user = useSelector((state: IRootState) => state.user.user);

  //MediaQuery hooks
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isLargerThan1700] = useMediaQuery("(min-width: 1700px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.200", "gray.700");

  //variables for weight, bp and bg submission
  const [weightRec, setWeightRec] = useState<Array<WeightDetail>>([]);
  const [weightInput, setWeightInput] = useState<string>("");
  const [bpRec, setBpRec] = useState<Array<BPDetail>>([]);
  const [diaInput, setDiaInput] = useState<string>("");
  const [sysInput, setSysInput] = useState<string>("");
  const [bgInput, setBGInput] = useState<string>("");
  const [dateTimeSubmit, setDateTimeSubmit] = useState<Date>(new Date());
  const [bgRec, setBgRec] = useState<Array<BGDetail>>([]);
  const [modalPostControl, setModalPostControl] = useState<"bp" | "bg" | "">(
    ""
  );

  //###############
  //API Functions
  //###############
  //fetch
  async function fetchWeightRecordFromServerByID() {
    const { data } = await axios.get(
      `${REACT_APP_API_SERVER}/diet/weight/${user[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      }
    );
    setWeightRec(data.weightRec);
  }
  async function fetchBPRecordFromServerByID() {
    const { data } = await axios.get(
      `${REACT_APP_API_SERVER}/diet/bp/${user[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      }
    );
    setBpRec(data.bpRec);
  }
  async function fetchBGRecordFromServerByID() {
    const { data } = await axios.get(
      `${REACT_APP_API_SERVER}/diet/bg/${user[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      }
    );
    setBgRec(data.bgRec);
  }
  //delete
  async function deleteRecord(
    type: "weight" | "bp" | "bg",
    rid: number | string
  ) {
    await axios.delete(`${REACT_APP_API_SERVER}/diet/${type}/${rid}`, {
      headers: {
        Authorization: `Bearer ${locateToken()}`,
      },
    });
    switch (type) {
      case "weight":
        fetchWeightRecordFromServerByID();
        return;
      case "bp":
        fetchBPRecordFromServerByID();
        return;
      case "bg":
        fetchBGRecordFromServerByID();
        return;
      default:
        return;
    }
  }
  //post
  async function postWeightRecord(weight: number, date: string, uid: number) {
    axios
      .post(
        `${REACT_APP_API_SERVER}/diet/weight`,
        {
          weight,
          date,
          uid,
        },
        {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "你成功上傳體重",
        });
        fetchWeightRecordFromServerByID();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "暫時未能上傳體重，請稍後再試",
        });
      });
  }

  async function postBPRecord(
    sys_bp: number,
    dia_bp: number,
    dateString: string,
    uid: number
  ) {
    axios
      .post(
        `${REACT_APP_API_SERVER}/diet/bp`,
        {
          sys_bp,
          dia_bp,
          dateString,
          uid,
        },
        {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "你成功上傳血壓指數",
        });
        fetchBPRecordFromServerByID();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "暫時未能上傳血壓指數，請稍後再試",
        });
      });
  }
  async function postBGRecord(bg: number, dateString: string, uid: number) {
    axios
      .post(
        `${REACT_APP_API_SERVER}/diet/bg`,
        {
          bg,
          dateString,
          uid,
        },
        {
          headers: {
            Authorization: `Bearer ${locateToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "你成功上傳血糖指數",
        });
        fetchBGRecordFromServerByID();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "暫時未能上傳血糖指數，請稍後再試",
        });
      });
  }
  //end API functions
  //###############
  useEffect(() => {
    if (user[0].id) {
      fetchWeightRecordFromServerByID();
      fetchBGRecordFromServerByID();
      fetchBPRecordFromServerByID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Flex
        gap={1}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        w="100%"
        my={2}
      >
        {/* Weight part */}
        <Flex
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "32%" : "430px"}
          bg={bg}
          borderRadius={"3xl"}
          flexDir={"column"}
          maxH={"720px"}
          p={5}
        >
          <Flex h={isSmallerThan600 ? "auto" : "150px"}>
            <Flex>
              <Image
                boxSize={isSmallerThan600 ? "100px" : "150px"}
                objectFit={"scale-down"}
                src="https://4.bp.blogspot.com/-SXG--O1E2i0/VVGVgRDH8QI/AAAAAAAAtmQ/U8HhB5NUFgc/s800/kenkoushindan03_taijuu.png"
              />
            </Flex>
            <Flex gap={2} flexWrap={"wrap"} flexDir={"column"}>
              <Heading
                fontSize={isSmallerThan600 ? "md" : "lg"}
                minH={isSmallerThan600 ? "auto" : "44px"}
              >
                請更新你的體重！我們建議你每星期更新一次！
              </Heading>
              <Flex gap={2} p={4} flexWrap={"wrap"}>
                <Input
                  placeholder="體重(kg)"
                  htmlSize={isSmallerThan600 ? 6 : 4}
                  width="auto"
                  type={"number"}
                  value={weightInput}
                  size={"sm"}
                  onChange={(e) => {
                    setWeightInput(e.target.value);
                  }}
                />
                <Button
                  size={"sm"}
                  onClick={async () => {
                    if (!weightInput || isNaN(parseInt(weightInput))) {
                      Swal.fire({
                        icon: "error",
                        title: "請輸入數字",
                      });
                      return;
                    }
                    await postWeightRecord(
                      parseFloat(weightInput),
                      new Date().toISOString(),
                      user[0].id as number
                    );
                    setWeightInput("");
                  }}
                >
                  更新
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Divider my={3} />
          <Heading textAlign={"center"} my={2}>
            體重記錄
          </Heading>
          <Flex w={"100%"} maxH={"480px"} overflow={"auto"}>
            {/* Weight Table */}
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.100"}>
                <Tr>
                  <Th>日期</Th>
                  <Th textAlign={"center"}>體重(kg)</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {weightRec.map((rec) => {
                  return (
                    <Tr key={`weight_rec_${rec.id}`}>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {new Date(rec.date).toLocaleDateString()}
                      </Td>
                      <Td
                        fontSize={isSmallerThan600 ? "14" : "16"}
                        textAlign={"center"}
                      >
                        {rec.weight}
                      </Td>
                      <Td>
                        <CloseButton
                          size="sm"
                          fontSize={"8"}
                          onClick={() => {
                            Swal.fire({
                              icon: "question",
                              title: "你確定要移除？",
                              showCancelButton: true,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteRecord("weight", rec.id);
                              }
                            });
                          }}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            {/* Weight Table end */}
          </Flex>
        </Flex>
        {/* BP */}
        <Flex
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "32%" : "430px"}
          bg={bg}
          borderRadius={"3xl"}
          flexDir={"column"}
          maxH={"720px"}
          p={5}
        >
          <Flex h={isSmallerThan600 ? "auto" : "150px"}>
            <Flex>
              <Image
                boxSize={isSmallerThan600 ? "70px" : "130px"}
                objectFit={"scale-down"}
                src="https://1.bp.blogspot.com/-YIL1WatLnQc/U82wyiz4GnI/AAAAAAAAjDk/i1S5WQtHxWs/s400/body_shinzou_good.png"
              />
            </Flex>
            <Flex gap={2} p={4} flexWrap={"wrap"} flexDir={"column"}>
              <Heading
                fontSize={isSmallerThan600 ? "md" : "lg"}
                minH={isSmallerThan600 ? "auto" : "44px"}
              >
                請更新你的血壓！
              </Heading>
              <Flex gap={3}>
                <Flex flexDir={"column"}>
                  <Input
                    placeholder="上壓(mmHg)"
                    htmlSize={6}
                    width="auto"
                    size={"xs"}
                    value={sysInput}
                    onChange={(e) => setSysInput(e.target.value)}
                  />
                  <Input
                    placeholder="下壓(mmHg)"
                    htmlSize={6}
                    width="auto"
                    size={"xs"}
                    value={diaInput}
                    onChange={(e) => setDiaInput(e.target.value)}
                  />
                </Flex>
                <Button
                  size={"sm"}
                  onClick={() => {
                    if (
                      !sysInput ||
                      isNaN(parseInt(sysInput)) ||
                      !diaInput ||
                      isNaN(parseInt(diaInput))
                    ) {
                      Swal.fire({
                        icon: "error",
                        title: "請輸入數字",
                      });
                      return;
                    } else {
                      setModalPostControl("bp");
                      onOpen();
                    }
                  }}
                >
                  更新
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Divider my={3} />
          <Heading textAlign={"center"} my={2}>
            血壓記錄
          </Heading>
          {/* BP Table */}
          <Flex
            w={"100%"}
            maxH={"500px"}
            overflow={"auto"}
            overflowX={"hidden"}
          >
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.100"}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th textAlign={"center"}>上壓/下壓(mmHg)</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {bpRec.map((rec) => {
                  return (
                    <Tr key={`bp_rec_${rec.id}`}>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {new Date(rec.date).toLocaleDateString()}
                      </Td>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {rec.time.slice(0, -3)}
                      </Td>
                      <Td
                        fontSize={isSmallerThan600 ? "14" : "16"}
                        textAlign={"center"}
                      >
                        {rec.sys_bp}/{rec.dia_bp}
                      </Td>
                      <Td w={"1%"}>
                        <CloseButton
                          size="sm"
                          fontSize={"8"}
                          onClick={() => {
                            Swal.fire({
                              icon: "question",
                              title: "你確定要移除？",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteRecord("bp", rec.id);
                              }
                            });
                          }}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
          {/* BP Table end */}
        </Flex>
        {/* BG */}
        <Flex
          w={isSmallerThan600 ? "100%" : isLargerThan1700 ? "32%" : "430px"}
          bg={bg}
          borderRadius={"3xl"}
          flexDir={"column"}
          maxH={"720px"}
          p={5}
        >
          <Flex h={isSmallerThan600 ? "auto" : "150px"}>
            <Flex>
              <Image
                boxSize={isSmallerThan600 ? "100px" : "150px"}
                objectFit={"scale-down"}
                src="https://1.bp.blogspot.com/-ksgJvY53NnY/VVGVGspTMlI/AAAAAAAAtho/B6brGWmDc9Y/s400/insulin_woman.png"
              />
            </Flex>
            <Flex gap={2} p={4} flexWrap={"wrap"} flexDir={"column"}>
              <Heading
                fontSize={isSmallerThan600 ? "md" : "lg"}
                minH={isSmallerThan600 ? "auto" : "44px"}
              >
                請更新你的血糖指數！
              </Heading>
              <Flex gap={2} flexWrap={"wrap"}>
                <Input
                  placeholder="mmol/L"
                  htmlSize={isSmallerThan600 ? 6 : 2}
                  width="auto"
                  size={"sm"}
                  value={bgInput}
                  onChange={(e) => {
                    setBGInput(e.target.value);
                  }}
                />
                <Button
                  size={"sm"}
                  onClick={() => {
                    if (!bgInput || isNaN(parseInt(bgInput))) {
                      Swal.fire({
                        icon: "error",
                        title: "請輸入數字",
                      });
                      return;
                    } else {
                      setModalPostControl("bg");
                      onOpen();
                    }
                  }}
                >
                  更新
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Divider my={3} />
          <Heading textAlign={"center"} my={2}>
            血糖度數記錄
          </Heading>
          {/* BG Table */}
          <Flex
            w={"100%"}
            maxH={"500px"}
            overflow={"auto"}
            overflowX={"hidden"}
          >
            <Table variant="simple" size={"sm"}>
              <Thead position="sticky" top={0} bg={"gray.100"}>
                <Tr>
                  <Th>日期</Th>
                  <Th>時間</Th>
                  <Th fontSize={"12"} textAlign={"center"}>
                    血糖(mmol/L)
                  </Th>
                  <Th w={"1%"}></Th>
                </Tr>
              </Thead>
              <Tbody fontSize={"2px"}>
                {bgRec.map((rec) => {
                  return (
                    <Tr key={`bg_rec_${rec.id}`}>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {new Date(rec.date).toLocaleDateString()}
                      </Td>
                      <Td fontSize={isSmallerThan600 ? "14" : "16"}>
                        {rec.time.slice(0, -3)}
                      </Td>
                      <Td
                        fontSize={isSmallerThan600 ? "14" : "16"}
                        textAlign={"center"}
                      >
                        {rec.bg_measurement}
                      </Td>
                      <Td w={"1%"}>
                        <CloseButton
                          size="sm"
                          fontSize={"8"}
                          onClick={() => {
                            Swal.fire({
                              icon: "question",
                              title: "你確定要移除？",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteRecord("bg", rec.id);
                              }
                            });
                          }}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
          {/* BG Table end */}
        </Flex>
      </Flex>
      {/* Modal for timeDate submit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>請選擇你的日期和時間</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setSysInput("");
              setDiaInput("");
              setBGInput("");
              setModalPostControl("");
            }}
          />
          <ModalBody>
            {modalPostControl === "bp" ? (
              <>
                <Text>
                  <b>上壓： </b>
                  {sysInput} mmHg
                </Text>
                <Text>
                  <b>下壓： </b>
                  {diaInput} mmHg
                </Text>
              </>
            ) : (
              ""
            )}
            {modalPostControl === "bg" ? (
              <>
                <Text>
                  <b>血糖：</b> {bgInput} mmol/L
                </Text>
              </>
            ) : (
              ""
            )}
            <Text mt={5} mb={2} fontWeight={"bold"}>
              日期及時間：
            </Text>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              onChange={(e) => setDateTimeSubmit(new Date(e.target.value))}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={async () => {
                if (modalPostControl === "") {
                  await Swal.fire({
                    icon: "error",
                    title: "發生錯誤，請再重新更新資料",
                  });
                }
                if (modalPostControl === "bp") {
                  await postBPRecord(
                    parseInt(sysInput),
                    parseInt(diaInput),
                    dateTimeSubmit.toISOString(),
                    user[0].id as number
                  );
                  setSysInput("");
                  setDiaInput("");
                }
                if (modalPostControl === "bg") {
                  await postBGRecord(
                    parseFloat(bgInput),
                    dateTimeSubmit.toISOString(),
                    user[0].id as number
                  );
                  setBGInput("");
                }
                onClose();
                setModalPostControl("");
              }}
            >
              確認
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setSysInput("");
                setDiaInput("");
                setBGInput("");
                setModalPostControl("");
              }}
            >
              關閉
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*  */}
    </>
  );
}
