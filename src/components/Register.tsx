import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToken,
  useToast,
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  FieldInputProps,
  Formik,
  FormikHelpers,
  Form,
} from "formik";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { RegisterRequest } from "../types/authTypes";
import { useAuth } from "../service/authProvider";
import { useApi } from "../service/apiProvider";
import { getErrorMessage } from "../service/utils";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name should be at least 3 characters long.")
    .max(40, "Full Name should be at most 40 characters long."),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address."),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters long.")
    .max(20, "Password should be at most 20 characters long."),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username should be at least 3 characters long.")
    .max(20, "Username should be at most 20 characters long."),
});

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [blue400] = useToken("colors", ["blue.400"]);
  const { setUser } = useAuth();
  const api = useApi();
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        username: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (
        values: RegisterRequest,
        { setSubmitting }: FormikHelpers<RegisterRequest>
      ) => {
        console.log("triggered");
        try {
          const userDetails = await api.register(values);
          setUser(userDetails);
          toast({
            title: "Account created.",
            description: "Your account has been created.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          toast({
            title: "An error occurred.",
            description: errorMessage,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched, isValid, dirty }) => (
        <Flex
          minH={"calc(100vh - 14rem)"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign up for your account</Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Form>
                <Stack spacing={4}>
                  <Field name="name">
                    {({ field }: { field: FieldInputProps<any> }) => (
                      <FormControl
                        id="name"
                        isInvalid={Boolean(errors.name && touched?.name)}
                      >
                        <FormLabel>Full Name</FormLabel>
                        <Input {...field} type="text" />
                        <ErrorMessage
                          name="name"
                          component={(props) => (
                            <Text color="red.500" align={"start"} {...props} />
                          )}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="username">
                    {({ field }: { field: FieldInputProps<any> }) => (
                      <FormControl
                        id="username"
                        isInvalid={Boolean(
                          errors.username && touched?.username
                        )}
                      >
                        <FormLabel>Username</FormLabel>
                        <Input {...field} type="text" />
                        <ErrorMessage
                          name="username"
                          component={(props) => (
                            <Text color="red.500" align={"start"} {...props} />
                          )}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field }: { field: FieldInputProps<any> }) => (
                      <FormControl
                        id="email"
                        isInvalid={Boolean(errors.email && touched?.email)}
                      >
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                        <ErrorMessage
                          name="email"
                          component={(props) => (
                            <Text color="red.500" align={"start"} {...props} />
                          )}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field }: { field: FieldInputProps<any> }) => (
                      <FormControl
                        id="password"
                        isInvalid={Boolean(
                          errors.password && touched?.password
                        )}
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <ErrorMessage
                          name="password"
                          component={(props) => (
                            <Text color="red.500" align={"start"} {...props} />
                          )}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      isDisabled={!isValid || !dirty}
                      isLoading={isSubmitting}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <RouterLink to="/login" style={{ color: blue400 }}>
                        Login
                      </RouterLink>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            </Box>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
}
