import {
  ErrorMessage,
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../service/authProvider";
import { getErrorMessage } from "../service/utils";
import { UserDetails } from "../types/authTypes";
import { useState } from "react";

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
  InputGroup,
  InputRightElement,
  useToken,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../service/apiProvider";

export default function SimpleCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [blue400] = useToken("colors", ["blue.400"]);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const api = useApi();
  const { t } = useTranslation();

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string()
        .required(t("email is required"))
        .email(t("email is invalid")),
      password: Yup.string().required(t("password is required")),
    });
  }, []);

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
            title: t("error occurred"),
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
                  <Stack spacing={10}>
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
                  <Stack pt={6}>
                    <Text align={"center"}>
                      {t("don't have an account")}{" "}
                      <RouterLink to="/register" style={{ color: blue400 }}>
                        {t("register")}
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
