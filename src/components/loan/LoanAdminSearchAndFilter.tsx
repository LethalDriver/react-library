import {
  Box,
  Button,
  filter,
  Flex,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LoanStatus } from "../../types/loanTypes";
import { useTranslation } from "react-i18next";

interface LoanAdminSearchAndFilterProps {
  onSearch: (username: string) => void;
  onFilter: (status: string | null) => void;
}

const LoanAdminSearchAndFilter: React.FC<LoanAdminSearchAndFilterProps> = ({
  onSearch,
  onFilter,
}) => {
  const { t } = useTranslation();
  const filterOptions: Record<string, string> = {
    PENDING_APPROVAL: t("pending approval"),
    APPROVED: t("approved"),
    REJECTED: t("rejected"),
    RETURNED: t("returned"),
    RETURNED_ACCEPTED: t("returned accepted"),
    RETURNED_REJECTED: t("returned rejected"),
    OVERDUE: t("overdue"),
  };

  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<string>("ALL");

  const handleSearch = () => {
    onSearch(username);
  };

  const handleFilter = (status: string) => {
    setStatus(status);
    if (status === "") {
      onFilter(null);
    } else {
      onFilter(status);
    }
  };

  return (
    <Flex
      gap={4}
      direction={{ base: "column", md: "row" }}
      boxShadow="base"
      borderRadius="md"
      p={4}
    >
      <Box flex="5">
        <Input
          placeholder={t("search by username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="md"
        />
      </Box>
      <Select
        placeholder={t("filter by status")}
        value={status}
        onChange={(e) => handleFilter(e.target.value)}
        flex="1"
      >
        {Object.entries(filterOptions).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
      <Button bg={"blue.400"} textColor={"white"} onClick={handleSearch}>
        {t("search")}
      </Button>
    </Flex>
  );
};

export default LoanAdminSearchAndFilter;
