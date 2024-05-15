import { Box, Button, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";

interface LoanAdminSearchAndFilterProps {
  onSearch: (username: string, status: string) => void;
}

const LoanAdminSearchAndFilter: React.FC<LoanAdminSearchAndFilterProps> = ({
  onSearch,
}) => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

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
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </Select>
      <Button onClick={handleSearch}>Search</Button>
    </Box>
  );
};

export default LoanAdminSearchAndFilter;
