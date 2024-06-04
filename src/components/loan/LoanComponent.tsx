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
import { useTranslation } from "react-i18next";
import { t } from "i18next";

type LoanProps = {
  loan: Loan;
  refetch: () => void;
};

const LoanComponent: React.FC<LoanProps> = ({ loan, refetch }) => {
  const { user } = useAuth();
  const api = useApi();
  const isAdmin = useMemo(() => user?.role === "LIBRARIAN", [user]);
  const { t } = useTranslation();
  const statuses: Record<LoanStatus, string> = {
    PENDING_APPROVAL: t("pending approval"),
    APPROVED: t("approved"),
    REJECTED: t("rejected"),
    RETURNED: t("returned"),
    RETURNED_ACCEPTED: t("returned accepted"),
    RETURNED_REJECTED: t("returned rejected"),
  };
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
            {isAdmin && (
              <Text>
                <strong>{t("user")}: </strong> {loan.user.username}
              </Text>
            )}
            <Text>
              <strong>{t("book title")}: </strong>
              {loan.book.title}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>
          {t("loan id")}: {loan.id}
        </Text>
        <Text>
          {t("loan date")}: {loan.loanDate}
        </Text>
        <Text>
          {t("return date")}:{" "}
          {loan.returnDate ? loan.returnDate : t("not returned yet")}
        </Text>
        <Text>
          {t("due date")}: {loan.dueDate}
        </Text>
        <Text>
          {t("status")}: {statuses[loan.status]}
        </Text>
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
                      {t("return book")}
                    </Button>
                  )
                );
              case "PENDING_APPROVAL":
                return (
                  isAdmin && (
                    <Button colorScheme="green" size="sm" onClick={approveLoan}>
                      {t("approve loan")}
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
                      {t("approve return")}
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
