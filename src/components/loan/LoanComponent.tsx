import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useAuth } from "../../service/authProvider";
import { Loan, LoanStatus } from "../../types/loanTypes";
import { useApi } from "../../service/apiProvider";

type LoanProps = {
  loan: Loan;
  refetch: () => void;
};
const statuses: Record<LoanStatus, string> = {
  PENDING_APPROVAL: "Pending Approval",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  RETURNED: "Returned",
  RETURNED_ACCEPTED: "Returned Accepted",
  RETURNED_REJECTED: "Returned Rejected",
};

const LoanComponent: React.FC<LoanProps> = ({ loan, refetch }) => {
  const { user } = useAuth();
  const api = useApi();
  const isAdmin = useMemo(() => user?.role === "LIBRARIAN", [user]);
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
        <Text>Status: {statuses[loan.status]}</Text>
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
