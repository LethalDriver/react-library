import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Text,
  AccordionPanel,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";
import { Loan, LoanStatus } from "../../types/loanTypes";
import React from "react";
import { Button } from "@chakra-ui/react";
import { api } from "../../service/api";

type LoanProps = {
  loan: Loan;
};
const status: Record<LoanStatus, string> = {
  PENDING_APPROVAL: "Pending Approval",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  RETURNED: "Returned",
  RETURNED_ACCEPTED: "Returned Accepted",
  RETURNED_REJECTED: "Returned Rejected",
};

const LoanComponent: React.FC<LoanProps> = ({ loan }) => {
  const handleReturn = async () => {
    api.returnBookLoan(loan.id);
  };
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text>{loan.book.title}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>Loan ID: {loan.id}</Text>
        <Text>User: {loan.user.name}</Text>
        <Text>Loan Date: {loan.loanDate}</Text>
        <Text>Return Date: {loan.returnDate}</Text>
        <Text>Due Date: {loan.dueDate}</Text>
        <Text>Status: {status[loan.status]}</Text>
        {loan.status === "APPROVED" && (
          <Button colorScheme="blue" size="sm" onClick={handleReturn}>
            Return
          </Button>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default LoanComponent;
