import { Box, Button, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { LoanStatus } from "../../types/loanTypes";

interface LoanAdminSearchAndFilterProps {
  onSearch: (username: string, status: string) => void;
}

const LoanAdminSearchAndFilter: React.FC<LoanAdminSearchAndFilterProps> = ({
  onSearch,
}) => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  const statuses: Record<LoanStatus, string> = {
    PENDING_APPROVAL: "Pending Approval",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    RETURNED: "Returned",
    RETURNED_ACCEPTED: "Returned Accepted",
    RETURNED_REJECTED: "Returned Rejected",
  };

  const handleSearch = () => {
    onSearch(username, status);
  };

  return (
    <Box>
      <Input
        placeholder="Search by username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Select
        placeholder="Filter by status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {Object.entries(statuses).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
      <Button onClick={handleSearch}>Search</Button>
    </Box>
  );
};

export default LoanAdminSearchAndFilter;
