import { Accordion, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loan } from "../types/loanTypes";
import api from "../service/api";
import LoanComponent from "./LoanComponent";

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
            <LoanComponent key={loan.id} loan={loan} />
        ))}
      </Accordion>
    </Stack>
  );
};

export default LoansComponent;
