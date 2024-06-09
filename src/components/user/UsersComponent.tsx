import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../service/apiProvider";
import { UserDetails } from "../../types/authTypes";
import UserCardComponent from "./UserCardComponent";
import { useAuth } from "../../service/authProvider";

const Books = () => {
  const api = useApi();
  const { user } = useAuth();
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const fetchUsers = async () => {
    let fetchedUsers = await api.fetchUsers();
    fetchedUsers = fetchedUsers.filter((u) => u.id !== user?.id);
    setUsers(fetchedUsers);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onSearchButtonClick = async () => {
    if (search) {
      const users = await api.searchUsers(search);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Stack spacing={4}>
      <Stack
        direction="row"
        spacing={4}
        p={4}
        boxShadow="base"
        borderRadius="md"
        bg="white"
      >
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            value={search}
            onChange={onSearchChange}
            placeholder={t("search users")}
          />
        </InputGroup>
        <Button
          bg={"blue.400"}
          textColor={"white"}
          onClick={onSearchButtonClick}
        >
          {t("search")}
        </Button>
      </Stack>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {" "}
        {users.map((userEl) => (
          <UserCardComponent user={userEl} refetch={fetchUsers} />
        ))}
      </Grid>
    </Stack>
  );
};

export default Books;
