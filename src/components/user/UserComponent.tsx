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
import { useApi } from "../../service/apiProvider";
import { useTranslation } from "react-i18next";

const UserComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useAuth();
  const api = useApi();
  const { t } = useTranslation();

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
        <Text fontSize={"4xl"}>
          {t("profile")}
        </Text>

        <Box>
          <Stack spacing={4}>
            <Text>
              <strong>{t("full name")}: </strong> {user?.name}
            </Text>
            <Text>
              <strong>{t("email")}:</strong> {user?.email}
            </Text>
            <Text>
              <strong>{t("username")}:</strong> {user?.username}
            </Text>
            <Text>
              <strong>{t("role")}:</strong> {user?.role}
            </Text>
          </Stack>
        </Box>

        <Button onClick={onOpen}>
          {t("edit")}
        </Button>
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
