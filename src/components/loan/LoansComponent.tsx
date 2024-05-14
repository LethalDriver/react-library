import { Accordion, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoanComponent from "./LoanComponent";
import { Loan } from "../../types/loanTypes";
import api from "../../service/api";
import { useAuth } from "../../service/authProvider";

const LoansComponent = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const { user } = useAuth();
  const fetchLoans = async () => {
    const fetchedLoans = await api.fetchLoans();
    setLoans(fetchedLoans);
  };
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <Stack spacing={4}>
      <Accordion allowToggle>
        {loans.map((loan) => (
          <LoanComponent
            key={loan.id}
            loan={loan}
            isAdmin={user?.role === "LIBRARIAN"}
            refetch={fetchLoans}
          />
        ))}
      </Accordion>
    </Stack>
  );
};

export default LoansComponent;
