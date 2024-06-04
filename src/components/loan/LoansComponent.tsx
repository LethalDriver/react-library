import { Accordion, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../service/authProvider";
import { Loan, LoanStatus } from "../../types/loanTypes";
import LoanAdminSearchAndFilter from "./LoanAdminSearchAndFilter";
import LoanComponent from "./LoanComponent";
import { useApi } from "../../service/apiProvider";

const LoansComponent = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [search, setSearch] = useState<string>("");
  const { user } = useAuth();
  const api = useApi();
  const isAdmin = user?.role === "LIBRARIAN";
  console.log(user);
  const fetchLoans = async () => {
    if (isAdmin) {
      if (!search) {
        const fetchedLoans = await api.fetchAllLoans();
        setLoans(fetchedLoans);
      } else {
        console.log(search);
        const fetchedLoans = await api.searchLoansByUsernames(search);
        setLoans(fetchedLoans);
      }
    } else {
      const fetchedLoans = await api.fetchUserLoans();
      setLoans(fetchedLoans);
    }
  };
  const fetchOverdueLoans = async () => {
    const fetchedLoans = await api.fetchOverdueLoans();
    setLoans(fetchedLoans);
  };
  const fetchAndFilterLoans = async (status: string) => {
    const fetchedLoans = await api.fetchAllLoans();
    const filteredLoans = fetchedLoans.filter((loan) => loan.status === status);
    setLoans(filteredLoans);
  };
  const onSearch = async (username: string) => {
    setSearch(username);
    fetchLoans();
  };
  const onFilter = (status: string | null) => {
    switch (status) {
      case null:
        fetchLoans();
        break;
      case "OVERDUE":
        fetchOverdueLoans();
        break;
      default:
        fetchAndFilterLoans(status);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [user]);

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
