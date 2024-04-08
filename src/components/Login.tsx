import * as Yup from "yup";
import api from "../service/httpService";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldInputProps,
  FormikProps,
} from "formik";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function SimpleCard() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await api.login(values);
          console.log("Logged in successfully");
        } catch (error) {
          alert("An error occurred. Please try again later.");
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Flex
          minH={"calc(100vh - 18rem)"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Form>
                <Stack spacing={4}>
                  <Field name="email">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<any>;
                      form: FormikProps<any>;
                    }) => (
                      <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                        <ErrorMessage name="email" component="div" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<any>;
                      form: FormikProps<any>;
                    }) => (
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" />
                        <ErrorMessage name="password" component="div" />
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Text color={"blue.400"}>Forgot password?</Text>
                    </Stack>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      disabled={isSubmitting}
                    >
                      Sign in
                    </Button>
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
