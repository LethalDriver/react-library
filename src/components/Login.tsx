import {
  ErrorMessage,
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikHelpers,
} from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../service/authProvider";
import { UserDetails } from "../types/authTypes";
import { getErrorMessage } from "../service/utils";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useApi } from "../service/apiProvider";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address."),
  password: Yup.string().required("Password is required"),
});

export default function SimpleCard() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const api = useApi();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }: FormikHelpers<any>) => {
        try {
          const userDto = (await api.login(values)) as UserDetails;
          setUser(userDto);
          navigate("/books");
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
              <Heading fontSize={"4xl"}>{t("sign in account")}</Heading>
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
                    {({ field }: { field: FieldInputProps<any> }) => (
                      <FormControl
                        id="email"
                        isInvalid={Boolean(errors.email && touched?.email)}
                      >
                        <FormLabel>{t("email")}</FormLabel>
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
                        <FormLabel>{t("password")}</FormLabel>
                        <Input {...field} type="password" />
                        <ErrorMessage
                          name="password"
                          component={(props) => (
                            <Text color="red.500" align="start" {...props} />
                          )}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>{t("remember me")}</Checkbox>
                      <Text color={"blue.400"}>{t("forgot password")}</Text>
                    </Stack>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      isDisabled={!isValid || !dirty}
                      isLoading={isSubmitting}
                    >
                      {t("sign in")}
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
