import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  extendTheme,
  Box,
  Container,
  Button,
  ButtonGroup
} from "@chakra-ui/react"
import {Formik} from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, IRootState } from "../../redux/store"
import {login} from "../../redux/Slice/AuthSlice"


type user = {
  userName: string
  password:string|number
}
export function Login() {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // const dispatch = useDispatch<AppDispatch>();
  // const loadingStatus = useSelector((state: IRootState) => state.user.loading);

  let userData:user = {
    userName:username,
    password:userPassword
  }
  
  const LoginSubmit = async () => {
      console.log(`userName::${username}`)
      console.log(`Password::${userPassword}`)
      console.log('client submit submit')

  }

  // useEffect(() => {
  //   setUsername(() => username = "")
  //   setUserPassword(() => username = "")
  // }, [isAdmin])

  const userNameError = username === "";
  const passwordError = userPassword === "";

  return (
    <Container maxW="50%" bg="blue.600" mt={50}>
      <Container maxW="100%">
        <FormLabel fontSize="80px" fontWeight="semibold" textAlign="center">
          NutriPOD{" "}
        </FormLabel>
      </Container>

      <ChakraProvider>
        <Box p={100}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              {
                LoginSubmit();
              }
            }}
          >
            <FormLabel>USERNAME</FormLabel>
            <FormControl
              variant="floating"
              id="userName"
              isRequired
              isInvalid={userNameError}
            >
              <Input
                placeholder="username"
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              {!userNameError ? (
                <FormHelperText>
                  Please make sure your username is correct
                </FormHelperText>
              ) : (
                <FormErrorMessage>Your username is missing</FormErrorMessage>
              )}
            </FormControl>

            <FormLabel>PASSWORD</FormLabel>
            <FormControl
              variant="floating"
              id="password"
              isRequired
              isInvalid={passwordError}
            >
              <Input
                placeholder="password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
              {!passwordError ? (
                <FormHelperText>
                  Please make sure your username is correct
                </FormHelperText>
              ) : (
                <FormErrorMessage>Your username is missing</FormErrorMessage>
              )}
            </FormControl>

            <ButtonGroup gap="10" mt="5">
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
              <Button colorScheme="blue" type="reset">
                Reset
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </ChakraProvider>
    </Container>
  );
}
