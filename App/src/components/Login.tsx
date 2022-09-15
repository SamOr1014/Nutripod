import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Link,
  Image,
  InputGroup,
  InputRightElement,
  Switch,
  Spinner,
  useMediaQuery,
  useBoolean,
  Stack
} from "@chakra-ui/react"
import { Link as ReactLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, IRootState } from "../redux/store"
import { userLogin, dietitianLogin, userSavedInfo, dietitianSavedInfo } from "../redux/Slice/AuthSlice"
import { loginThunk } from "../redux/Thunk/AuthThunk"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons"
import { FaFacebook, FaTwitter } from "react-icons/fa"

type user = {
  userName: string
  password: string | number
}
export function Login() {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [saveUser, setSaveUser] = useBoolean(false)
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state: IRootState) => state.user.loading);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");


  const LoginSubmit = async () => {
    let info = { username: username, password: userPassword, saveLoggedIn: saveUser }
    const result = await dispatch(loginThunk(info))
    if (result.payload.success) {
      const userInfo = result.payload.data
      if (userInfo.is_user) {
        const userData: userSavedInfo = {
          id: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          birthday: userInfo.birthday,
          height: userInfo.height,
          weight: userInfo.weight,
          gender: userInfo.gender,
          phone: userInfo.phone,
          address: userInfo.address,
          profession: userInfo.profession,
          HKID: userInfo.HKID,
          chronic_condition: userInfo.chronic_condition,
          education: userInfo.education,
          is_deleted: userInfo.is_deleted,
          is_user: userInfo.is_User,
          saveToken: saveUser
        }
        dispatch(userLogin(userData))
        navigate("/dashboard")
      } else if (!userInfo.is_user) {
        const dietitianData: dietitianSavedInfo = {
          id: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          is_user: userInfo.is_user,
          is_deleted: userInfo.is_deleted,
          saveToken: saveUser
        }
        dispatch(dietitianLogin(dietitianData))
        navigate("/dietitian")
      }
    }
  }

  if (loadingStatus) {
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )
  }

  const userNameError = username === " ";

  return (

    <Box
      w="100%"
      h="100%"
      bg='white'
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems='center'
    >

      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        alignItems='center'
        borderBottom='2px'
        borderColor='blackAlpha.300'
      >

        <Link as={ReactLink} to="/" >
          <Image
            src='logo.png'
            boxSize='150px'
            objectFit='fill'
            mt='1'></Image>
        </Link>

        <FormLabel
          color='black'
          fontSize='2xl'
          fontWeight='bold'>You Health is our first concern </FormLabel>
      </Box>


      <Box
        height='100%'
        width={isSmallerThan600 ? '100%' : '40%'}
        mt={5}
        display='flex'
        flexDirection="column"
        justifyContent="center"
        borderColor='blackAlpha.400'
        boxShadow='dark-lg' p='2' rounded='md' bg='white'
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            {
              LoginSubmit()
            }
          }}
        >

          <Box
            bg='gray.500'
            padding='50px'
            color='black'
            border='1px'
          >
            <FormLabel >USERNAME</FormLabel>
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
                <FormHelperText
                  fontWeight='bold'
                  color='black' >
                  Please login by your username
                </FormHelperText>
              ) : (
                <FormErrorMessage>Invalid input</FormErrorMessage>
              )}
            </FormControl>

            <FormLabel mt='4'>PASSWORD</FormLabel>

            <InputGroup size='md'>
              <Input
                pr='5rem'
                type={show ? 'text' : 'password'}
                placeholder='password'
                isRequired
                onChange={(e) => setUserPassword(e.target.value)}

              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  onClick={handleClick}>
                  {show ? <FontAwesomeIcon icon={solid('eye-slash')} /> : <FontAwesomeIcon icon={solid('eye')} />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <ButtonGroup
              display='flex'
              justifyContent='center'>

              <Button
                width='80%'
                mt='6'
                bg='messenger.300'

                colorScheme="blackAlpha" type="submit">
                Login
              </Button>
            </ButtonGroup>

            <Flex
              flexWrap='wrap'
              gap={isSmallerThan600 ? '25px' : '20%'}
              flexDirection={isSmallerThan600 ? 'column' : 'row'}
              justifyContent={isSmallerThan600 ? 'center' : 'space-evenly'}
              mt='6'>

              <Box
                display='flex'
                justifyContent='center'
              >
                <Switch
                  margin='2'
                  id='save-user'
                  alignSelf='center'
                  onChange={setSaveUser.toggle} />

                <FormLabel
                  htmlFor='save-user'
                  fontSize='20px'
                  alignSelf='center'
                  color='blackAlpha.800'
                  onChange={setSaveUser.toggle}>
                  keep me logged in
                </FormLabel>
              </Box>


              <Link
                as={ReactLink} to="/"
                fontSize='large'
                color='blackAlpha.800'
                display='flex'
                justifyContent='center'
              >
                Forgot password?
              </Link>

            </Flex>

          </Box>

        </form>

      </Box>

      <Box
        h='100%'
        w="100%"
        display='flex'
        flexDirection='column'
        justifyContent={"center"}
        alignItems={"center"}
        borderTop='2px'
        borderColor='blackAlpha.400'
        mt='6'
      >

        <FormLabel
          fontSize={isSmallerThan600 ? '2xl' : "3xl"}
          color='black'
          alignSelf='center'
          mt='5'> New to NutriPOD?
        </FormLabel>

        <Stack
          display='flex'
          justifyContent='center'
          direction='row'
          w={isSmallerThan600 ? "10%" : "100%"}
          gap='2'
          mt='2'
          flexWrap={"wrap"}>

          <Link as={ReactLink} to="/">
            <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid' w={"32"}>
              Email
            </Button>
          </Link>

          <Link href='https://www.facebook.com/' isExternal>
            <Button colorScheme='facebook' leftIcon={<FaFacebook />} w={"32"}>
              Facebook
            </Button>
          </Link>

          <Link href="https://twitter.com/" isExternal>
            <Button colorScheme='twitter' leftIcon={<FaTwitter />} w={"32"}>
              Twitter
            </Button>
          </Link>

          <Link as={ReactLink} to="/" >
            <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' w={"32"}>
              Call us
            </Button>
          </Link>

        </Stack>

        <Link
          as={ReactLink} to="/"
          fontSize='large'
          color='blackAlpha.800'
          display='flex'
          justifyContent='center'
          mt='5'
        >
          Terms of Use & Privacy Policy
        </Link>

      </Box>
    </Box>
  );
}
