import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../service/apiProvider";
import { useAuth } from "../../service/authProvider";
import EditUserDataModal from "./EditUserDataModal";

const UserComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { t } = useTranslation();

  const roles: Record<string, string> = {
    READER: t("reader"),
    LIBRARIAN: t("librarian"),
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
        <Text fontSize={"4xl"}>{t("profile")}</Text>

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
              <strong>{t("role")}:</strong> {roles[user?.role || "READER"]}
            </Text>
          </Stack>
        </Box>

        <Button onClick={onOpen}>{t("edit")}</Button>
        <EditUserDataModal isOpen={isOpen} onClose={onClose} />
      </Stack>
    </Flex>
  );
};

export default UserComponent;
