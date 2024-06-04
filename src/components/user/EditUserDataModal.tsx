import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Field, Form, Formik, FieldInputProps, ErrorMessage } from "formik";
import { validationSchema } from "../Register";
import { RegisterRequest } from "../../types/authTypes";
import { useAuth } from "../../service/authProvider";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../service/utils";
import { useApi } from "../../service/apiProvider";

interface EditUserDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditUserDataModal: React.FC<EditUserDataModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const api = useApi();
  const { t } = useTranslation();
  const handleUserEdit = async (values: RegisterRequest) => {
    try {
      const updatedUser = await api.updateUser(values);
      setUser(updatedUser);
      toast({
        title: t("user data updated"),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast({
        title: t("error"),
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            name: user?.name || "",
            email: user?.email || "",
            username: user?.username || "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values: RegisterRequest) => {
            await handleUserEdit(values);
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <ModalHeader>{t("edit user data")}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  {t("save")}
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  {t("cancel")}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditUserDataModal;
