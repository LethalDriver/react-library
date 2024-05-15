import { Accordion, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../service/api";
import { useAuth } from "../../service/authProvider";
import { Loan } from "../../types/loanTypes";
import LoanAdminSearchAndFilter from "./LoanAdminSearchAndFilter";
import LoanComponent from "./LoanComponent";

const LoansComponent = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const { user } = useAuth();
  const isAdmin = user?.role === "LIBRARIAN"
  const fetchLoans = async () => {
    const fetchedLoans = await api.fetchLoans();
    setLoans(fetchedLoans);
  };
  const onSearch = async (username: string) => {
    const fetchedLoans = await api.searchLoansByUsernames(username);
    setLoans(fetchedLoans);
  };
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <Stack spacing={4}>
      {isAdmin && <LoanAdminSearchAndFilter onSearch={onSearch} />}
      <Accordion allowToggle>
        {loans.map((loan) => (
          <LoanComponent key={loan.id} loan={loan} refetch={fetchLoans} />
        ))}
      </Accordion>
    </Stack>
  );
};

export default LoansComponent;
