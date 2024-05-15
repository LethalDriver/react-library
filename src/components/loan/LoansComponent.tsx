import { Accordion, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoanComponent from "./LoanComponent";
import { Loan } from "../../types/loanTypes";
import api from "../../service/api";

const LoansComponent = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
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
          <LoanComponent key={loan.id} loan={loan} refetch={fetchLoans} />
        ))}
      </Accordion>
    </Stack>
  );
};

export default LoansComponent;
