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

interface LoanAdminSearchAndFilterProps {
  onSearch: (username: string) => void;
  onFilter: (status: LoanStatus | null) => void;
}

const LoanAdminSearchAndFilter: React.FC<LoanAdminSearchAndFilterProps> = ({
  onSearch,
  onFilter,
}) => {
  const filterOptions: Record<string, string> = {
    PENDING_APPROVAL: "Pending Approval",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    RETURNED: "Returned",
    RETURNED_ACCEPTED: "Returned Accepted",
    RETURNED_REJECTED: "Returned Rejected",
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
      onFilter(status as LoanStatus);
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
          placeholder="Search by username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="md"
        />
      </Box>
      <Select
        placeholder="Filter by status"
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
        Search
      </Button>
    </Flex>
  );
};

export default LoanAdminSearchAndFilter;
