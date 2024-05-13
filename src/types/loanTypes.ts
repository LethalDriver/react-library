import { UserDetails } from "./authTypes";
import { Book } from "./bookTypes";

export type Loan = {
  id: number;
  book: Book;
  user: UserDetails;
  loanDate: string;
  returnDate: string;
  dueDate: string;
  status: LoanStatus;
};

export type LoanStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "RETURNED"
  | "RETURNED_ACCEPTED"
  | "RETURNED_REJECTED";
