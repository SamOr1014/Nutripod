import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Box,
  Container,
  Button,
  ButtonGroup
} from "@chakra-ui/react"
import { Formik, Field, Form, FormikHelpers, FormikErrors } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, IRootState } from "../redux/store"
import { login } from "../redux/Slice/AuthSlice"
import { loginThunk } from "../redux/Thunk/AuthThunk"

type user = {
  userName: string
  password: string | number
}
export function Login() {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  // const loadingStatus = useSelector((state: IRootState) => state.user.loading);

  const LoginSubmit = async () => {
    let info = {username:username,password:userPassword}
    console.log(`userName::${username}`)
    console.log(`Password::${userPassword}`)
    console.log('client submit submit')
    const result = await dispatch(loginThunk(info))
    console.log(result)

  }

  const testing = async (name: string, word: string) => {
    console.log(`userName::${name}`)
    console.log(`Password::${word}`)
    console.log('formik submit submit')
  }

  // useEffect(() => {
  //   setUsername(() => username = "")
  //   setUserPassword(() => username = "")
  // }, [isAdmin])

  const userNameError = username === " ";
  const passwordError = userPassword === " ";

  return (
    <Container maxW="50%" bg="blue.600" mt={50}>
      <Container maxW="100%">
        <FormLabel fontSize="80px" fontWeight="semibold" textAlign="center">
          NutriPOD
        </FormLabel>
      </Container>

      <Box p={100}>
        <Formik initialValues={{
          userName: '',
          password: ''
        }}
          onSubmit={(e) => {
            {
              testing(e.userName, e.password)
            }
          }
          }>
          <Form >
            <label htmlFor="firstName">Username</label>
            <Field id="userName" name="userName" placeholder="username" />

            <label htmlFor="lastName">Password</label>
            <Field id="password" name="password" placeholder="password" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>



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
                Please enter your username
              </FormHelperText>
            ) : (
              <FormErrorMessage>Invalid input</FormErrorMessage>
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
                Please enter your password
              </FormHelperText>
            ) : (
              <FormErrorMessage>Invalid input</FormErrorMessage>
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
    </Container>
  );
}
