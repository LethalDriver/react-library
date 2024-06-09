import {
  Box,
  Button,
  Stack,
  Text,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import EditUserDataModal from "./EditUserDataModal";
import { UserDetails } from "../../types/authTypes";
import { useApi } from "../../service/apiProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../service/authProvider";

type UserCardComponentProps = {
  user: UserDetails | null;
  refetch?: () => void;
};

const UserCardComponent = ({ user, refetch }: UserCardComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const isOwner = currentUser?.id === user?.id;
  const isAdmin = currentUser?.role === "LIBRARIAN";
  const api = useApi();
  const navigate = useNavigate();

  const roles: Record<string, string> = {
    READER: t("reader"),
    LIBRARIAN: t("librarian"),
  };

  const onDelete = async () => {
    if (isOwner) {
      api.deleteCurrentUser();
      navigate("/login");
    } else {
      await api.deleteUser(user?.id || 0);
      if (refetch) {
        refetch();
      }
    }
  };

  const makeAdmin = async () => {
    await api.makeAdmin(user?.id || 0);
    if (refetch) {
      refetch();
    }
  };

  const makeReader = async () => {
    await api.makeReader(user?.id || 0);
    if (refetch) {
      refetch();
    }
  };

  return (
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
      <Text fontSize={"4xl"}>{user?.username}</Text>

      <Box width="max-content">
        <Stack spacing={4}>
          <Text>
            <strong>{t("full name")}: </strong> {user?.name}
          </Text>
          <Text>
            <strong>{t("email")}:</strong> {user?.email}
          </Text>
          <Text>
            <strong>{t("role")}:</strong> {roles[user?.role || "READER"]}
          </Text>
        </Stack>
      </Box>

      <Flex direction="column">
        {isAdmin &&
          {
            READER: (
              <Button
                mb={4}
                colorScheme="green"
                onClick={makeAdmin}
                disabled={user?.role === "LIBRARIAN"}
              >
                {t("make librarian")}
              </Button>
            ),
            LIBRARIAN: (
              <Button
                mb={4}
                colorScheme="green"
                onClick={makeReader}
                disabled={user?.role === "READER"}
              >
                {t("make reader")}
              </Button>
            ),
          }[user?.role || "READER"]}
        <Button mb={4} colorScheme="blue" onClick={onOpen}>
          {t("edit")}
        </Button>
        <Button colorScheme="red" onClick={onDelete}>
          {t("delete")}
        </Button>

        <EditUserDataModal
          isOpen={isOpen}
          onClose={onClose}
          isOwner={isOwner}
          user={user}
          refetch={refetch}
        />
      </Flex>
    </Stack>
  );
};

export default UserCardComponent;
