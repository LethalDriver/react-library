import {
  Stack,
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
  isAdmin: boolean;
  refetch: () => void;
};
const status: Record<LoanStatus, string> = {
  PENDING_APPROVAL: "Pending Approval",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  RETURNED: "Returned",
  RETURNED_ACCEPTED: "Returned Accepted",
  RETURNED_REJECTED: "Returned Rejected",
};

const LoanComponent: React.FC<LoanProps> = ({ loan, isAdmin, refetch }) => {
  const handleReturn = async () => {
    await api.returnBookLoan(loan.id);
    refetch();
  };
  const approveLoan = async () => {
    await api.approveLoan(loan.id);
    refetch();
  };
  const approveReturn = async () => {
    await api.approveReturn(loan.id);
    refetch();
  };
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {isAdmin ? (
              <React.Fragment>
                <Text>Loan id: {loan.id}</Text>
                <Text>User: {loan.user.name}</Text>
              </React.Fragment>
            ) : (
              <Text>{loan.book.title}</Text>
            )}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {isAdmin ? (
          <Text>Book title: {loan.book.title}</Text>
        ) : (
          <Text>Loan ID: {loan.id}</Text>
        )}
        <Text>Loan Date: {loan.loanDate}</Text>
        <Text>Return Date: {loan.returnDate}</Text>
        <Text>Due Date: {loan.dueDate}</Text>
        <Text>Status: {status[loan.status]}</Text>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          {(() => {
            switch (loan.status) {
              case "APPROVED":
                return (
                  !isAdmin && (
                    <Button colorScheme="blue" size="sm" onClick={handleReturn}>
                      Return
                    </Button>
                  )
                );
              case "PENDING_APPROVAL":
                return (
                  isAdmin && (
                    <Button colorScheme="green" size="sm" onClick={approveLoan}>
                      Approve Loan
                    </Button>
                  )
                );
              case "RETURNED":
                return (
                  isAdmin && (
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={approveReturn}
                    >
                      Approve Return
                    </Button>
                  )
                );
              default:
                return null;
            }
          })()}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default LoanComponent;
