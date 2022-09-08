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
  Switch,
  Button,
  ButtonGroup
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  }
});

export function Login() {
  let inputE1 = useRef(null)

  let [isAdmin, setIsClient] = useState(false)
  let [username, setUsername] = useState("")
  let [userPassword, setUserPassword] = useState("")
  let [stuffName, setStuffName] = useState("")
  let [stuffPassword, setStuffPassword] = useState("")


  const userLoginSubmit = async () => {
    console.log(`userName::${username}`)
    console.log(`Password::${userPassword}`)
    console.log('client submit submit')
  }

  const stuffLoginSubmit = async () => {
    console.log(`stuffName::${stuffName}`)
    console.log(`StuffPassword::${stuffPassword}`)
    console.log('Stuff submit login')
  }


  const switchUser = async () => {
    console.log(inputE1.current)
    setIsClient(() => isAdmin = !isAdmin)
  }

  useEffect(() => {
    setUsername(() => username = "")
    setUserPassword(() => username = "")
    setStuffName(() => stuffName = "")
    setStuffPassword(() => stuffPassword = "")
  }, [isAdmin])

  return (

    isAdmin ? (
      <Container
        maxW="50%"
        bg='blue.600'
        marginTop={50}
      >
        <Container
          maxW="100%">
          <FormLabel
            fontSize='80px'
            fontWeight='semibold'
            textAlign='center'
          >NutriPOD </FormLabel>
        </Container>


        <ChakraProvider theme={theme}>
          <Box p={100}>
            <form onSubmit={
              (e) => {
                e.preventDefault()
                { stuffLoginSubmit() }
              }}>

              <FormLabel>Stuff Side</FormLabel>

              <FormLabel>USERNAME</FormLabel>
              <FormControl
                variant="floating"
                id="userName"
                isRequired
              >

                <Input
                  placeholder="username"
                  ref={inputE1}
                  name="username"
                  type="text"
                  onChange={(e) => setStuffName(e.target.value)} />
                <FormErrorMessage>Your First name is invalid</FormErrorMessage>
              </FormControl>

              <FormLabel>PASSWORD</FormLabel>
              <FormControl
                variant="floating"
                id="password"
                isRequired>

                <Input placeholder="password" onChange={(e) => setStuffPassword(e.target.value)} />
                <FormErrorMessage>Your First name is invalid</FormErrorMessage>
              </FormControl>


              <ButtonGroup gap='10'>
                <Button colorScheme='blue' type="submit">Submit</Button>
                <Button colorScheme='blue' type="reset">Reset</Button>
              </ButtonGroup>
            </form>


            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='switch-user' mb='0' >
                User/Stuff
              </FormLabel>
              <Switch id='switch-user' onChange={() => switchUser()} />
            </FormControl>


          </Box>
        </ChakraProvider>
      </Container>
    ) :

      <Container
        maxW="50%"
        bg='yellow.600'
        marginTop={50}
      >
        <Container
          maxW="100%">
          <FormLabel
            fontSize='80px'
            fontWeight='semibold'
            textAlign='center'
          >NutriPOD </FormLabel>
        </Container>

        <ChakraProvider theme={theme}>
          <Box p={100}>
            <form onSubmit={
              (e) => {
                e.preventDefault()
                { userLoginSubmit() }
              }}>
                
              <FormLabel>Client Side</FormLabel>
              <FormLabel>USERNAME</FormLabel>
              <FormControl
                variant="floating"
                id="userName"
                isRequired
              >

                <Input placeholder="username"
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)} />
                <FormErrorMessage>Your First name is invalid</FormErrorMessage>
              </FormControl>

              <FormLabel>PASSWORD</FormLabel>
              <FormControl
                variant="floating"
                id="password"
                isRequired>

                <Input placeholder="password" onChange={(e) => setUserPassword(e.target.value)} />
                <FormErrorMessage>Your First name is invalid</FormErrorMessage>
              </FormControl>

              <FormControl display='flex' alignItems='center'>
              </FormControl>

              <ButtonGroup gap='10'>
                <Button colorScheme='blue' type="submit">Submit</Button>
                <Button colorScheme='blue' type="reset">Reset</Button>
              </ButtonGroup>
            </form>

            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='switch-user' mb='0' >
                User/Stuff
              </FormLabel>
              <Switch id='switch-user' onChange={() => switchUser()} />
            </FormControl>

          </Box>
        </ChakraProvider>
      </Container>

  )
}


