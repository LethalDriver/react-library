import { Accordion, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../service/api";
import { useAuth } from "../../service/authProvider";
import { Loan } from "../../types/loanTypes";
import LoanAdminSearchAndFilter from "./LoanAdminSearchAndFilter";
import LoanComponent from "./LoanComponent";

const LoansComponent = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [search, setSearch] = useState<string>("");
  const { user } = useAuth();
  const isAdmin = user?.role === "LIBRARIAN";
  const fetchLoans = async () => {
    if (search) {
      const fetchedLoans = await api.searchLoansByUsernames(search);
      setLoans(fetchedLoans);
      return;
    } else {
      const fetchedLoans = await api.fetchLoans();
      setLoans(fetchedLoans);
    }
  };
  const onSearch = async (username: string) => {
    setSearch(username);
    fetchLoans();
  };
  const onFilter = (status: string | null) => {
    console.log(status);
    if (!status) {
      fetchLoans();
      return;
    }
    const filteredLoans = loans.filter((loan) => loan.status === status);
    setLoans(filteredLoans);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <Stack spacing={4}>
      {isAdmin && (
        <LoanAdminSearchAndFilter onSearch={onSearch} onFilter={onFilter} />
      )}
      <Accordion allowToggle>
        {loans.map((loan) => (
          <LoanComponent key={loan.id} loan={loan} refetch={fetchLoans} />
        ))}
      </Accordion>
    </Stack>
  );
};

export default LoansComponent;
