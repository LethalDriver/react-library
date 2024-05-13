import { UserDetails } from './authTypes'
import { Book } from './bookTypes'

export type Loan = {
    id: number
    book: Book
    user: UserDetails
    loanDate: string
    returnDate: string
    dueDate: string
    status: string
}