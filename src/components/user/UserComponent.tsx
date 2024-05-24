import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import EditUserDataModal from "./EditUserDataModal";
import { useAuth } from "../../service/authProvider";
import { RegisterRequest } from "../../types/authTypes";
import { api } from "../../service/api";

const UserComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useAuth();

  const handleUserEdit = async (user: RegisterRequest) => {
    api.updateUser(user);
  };

  return (
    <Flex minH={"calc(100vh - 14rem)"} align={"center"} justify={"center"}>
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={12}
        rounded={"lg"}
        bg={"white"}
        boxShadow={"lg"}
      >
        <Text fontSize={"4xl"}>Profile</Text>

        <Box>
          <Stack spacing={4}>
            <Text>
              <strong>Name:</strong> {user?.name}
            </Text>
            <Text>
              <strong>Email:</strong> {user?.email}
            </Text>
            <Text>
              <strong>Username:</strong> {user?.username}
            </Text>
            <Text>
              <strong>Role:</strong> {user?.role}
            </Text>
          </Stack>
        </Box>

        <Button onClick={onOpen}>Edit</Button>
        <EditUserDataModal
          isOpen={isOpen}
          onClose={onClose}
          handleEditUser={handleUserEdit}
        />
      </Stack>
    </Flex>
  );
};

export default UserComponent;
