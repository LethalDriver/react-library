import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldInputProps,
} from "formik";
import { registerRequest } from "../types/authTypes";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
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

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        username: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(
        values: registerRequest,
        { setSubmitting }: FormikHelpers<registerRequest>
      ) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
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
              <Stack spacing={4}>
                <Field name="fullName">
                  {({ field }: { field: FieldInputProps<any> }) => (
                    <FormControl
                      id="fullName"
                      isInvalid={Boolean(errors.fullName && touched?.fullName)}
                    >
                      <FormLabel>Full Name</FormLabel>
                      <Input {...field} type="text" />
                      <ErrorMessage
                        name="fullName"
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
                      isInvalid={Boolean(errors.username && touched?.username)}
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
                      isInvalid={Boolean(errors.password && touched?.password)}
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
            </Box>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
}
