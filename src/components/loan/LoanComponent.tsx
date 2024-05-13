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
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text>Loan ID: {loan.id}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>Book: {loan.book.title}</Text>
        <Text>User: {loan.user.name}</Text>
        <Text>Loan Date: {loan.loanDate}</Text>
        <Text>Return Date: {loan.returnDate}</Text>
        <Text>Due Date: {loan.dueDate}</Text>
        <Text>Status: {status[loan.status]}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default LoanComponent;
