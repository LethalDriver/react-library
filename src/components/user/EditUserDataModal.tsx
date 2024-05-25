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
  useToken,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Field, Form, Formik, FieldInputProps, ErrorMessage } from "formik";
import { validationSchema } from "../Register";
import { RegisterRequest, UserDetails } from "../../types/authTypes";
import { useAuth } from "../../service/authProvider";

interface EditUserDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleEditUser: (user: RegisterRequest) => void;
}

const EditUserDataModal: React.FC<EditUserDataModalProps> = ({
  isOpen,
  onClose,
  handleEditUser,
}) => {
  const { user, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [blue400] = useToken("colors", ["blue.400"]);
  const toast = useToast();
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
            await handleEditUser(values);
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <ModalHeader>Edit User Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
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
