import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../service/apiProvider";
import { useAuth } from "../../service/authProvider";
import { Loan, LoanStatus } from "../../types/loanTypes";

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

  const rejectLoan = async () => {
    await api.rejectLoan(loan.id);
    refetch();
  };

  const approveReturn = async () => {
    await api.approveReturn(loan.id);
    refetch();
  };

  const rejectReturn = async () => {
    await api.rejectReturn(loan.id);
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
          justifyContent={{
            base: "center",
            md: "flex-end",
          }}
          mt={4}
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
                    <Stack
                      direction={{
                        base: "column",
                        md: "row",
                      }}
                      spacing={4}
                      width={{
                        base: "100%",
                        md: "auto",
                      }}
                    >
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={approveLoan}
                      >
                        {t("approve loan")}
                      </Button>
                      <Button colorScheme="red" size="sm" onClick={rejectLoan}>
                        {t("reject loan")}
                      </Button>
                    </Stack>
                  )
                );
              case "RETURNED":
                return (
                  isAdmin && (
                    <Stack direction="row" spacing={4}>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={approveReturn}
                      >
                        {t("approve return")}
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={rejectReturn}
                      >
                        {t("reject return")}
                      </Button>
                    </Stack>
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
