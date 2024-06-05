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
import { useState, useMemo } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { RegisterRequest } from "../types/authTypes";
import { useAuth } from "../service/authProvider";
import { useApi } from "../service/apiProvider";
import { getErrorMessage } from "../service/utils";
import { useTranslation } from "react-i18next";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [blue400] = useToken("colors", ["blue.400"]);
  const { setUser } = useAuth();
  const api = useApi();
  const toast = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(t("full name is required")),
      email: Yup.string()
        .required(t("email is required"))
        .email(t("email is invalid")),
      password: Yup.string()
        .required(t("password is required"))
        .min(8, t("password min 8 characters")),
      username: Yup.string().required(t("username is required")),
    });
  }, []);

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
              <Heading fontSize={"4xl"}>{t("sign up account")}</Heading>
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
                        <FormLabel>{t("full name")}</FormLabel>
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
                        <FormLabel>{t("username")}</FormLabel>
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
                      {t("sign up")}
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      {t("already have account")}{" "}
                      <RouterLink to="/login" style={{ color: blue400 }}>
                        {t("sign in")}
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
