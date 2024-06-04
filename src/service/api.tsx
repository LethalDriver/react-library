import axios, { AxiosInstance } from "axios";
import { Book, BookPostRequest } from "../types/bookTypes";
import {
  LoginRequest,
  AuthenticationResponse,
  UserDetails,
  LogoutRequest,
  RegisterRequest,
} from "../types/authTypes";
import { Review, ReviewPostRequest } from "../types/reviewTypes";
import { Loan } from "../types/loanTypes";

interface ApiInstance extends AxiosInstance {
  login: (data: LoginRequest) => Promise<UserDetails>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<UserDetails>;
  updateUser: (data: RegisterRequest) => Promise<UserDetails>;
  userInfo: () => Promise<UserDetails | null>;
  fetchBooks: (title: string) => Promise<Book[]>;
  fetchBookDetails: (bookId: number) => Promise<Book>;
  fetchReviewsForBook: (bookId: number) => Promise<Review[]>;
  postReview: (reviewPostRequest: ReviewPostRequest) => Promise<Review>;
  fetchUserLoans: () => Promise<Loan[]>;
  fetchAllLoans: () => Promise<Loan[]>;
  fetchOverdueLoans: () => Promise<Loan[]>;
  requestBookLoan: (bookId: number) => Promise<Loan>;
  returnBookLoan: (loanId: number) => Promise<Loan>;
  approveLoan: (loanId: number) => Promise<Loan>;
  approveReturn: (loanId: number) => Promise<Loan>;
  addBook: (book: BookPostRequest) => Promise<Book>;
  editBook: (bookId: number, book: Book) => Promise<Book>;
  deleteBook: (bookId: number) => Promise<void>;
  editReview: (reviewId: number, review: Review) => Promise<Review>;
  deleteReview: (reviewId: number) => Promise<void>;
  searchLoansByUsernames: (username: string) => Promise<Loan[]>;
}

export const api = axios.create({
  baseURL: "http://localhost:8080",
}) as ApiInstance;

api.login = async function (data: LoginRequest) {
  const response = (await this.post("/auth/login", data))
    .data as AuthenticationResponse;
  localStorage.setItem("token", response.token);
  localStorage.setItem("refreshToken", response.refreshToken);
  return response.user;
};

api.register = async function (data: RegisterRequest) {
  const response = (await this.post("/auth/register", data))
    .data as AuthenticationResponse;
  localStorage.setItem("token", response.token);
  localStorage.setItem("refreshToken", response.refreshToken);
  return response.user;
};

api.updateUser = async function (data: RegisterRequest) {
  return (await this.put("/users", data)).data as UserDetails;
};

api.userInfo = async function () {
  try {
    return (await this.get("/users")).data as UserDetails;
  } catch (error) {
    return null;
  }
};

api.fetchBooks = async function (title: string) {
  return (
    await this.get("/books/title", {
      params: { title },
    })
  ).data as Book[];
};

api.fetchBookDetails = async function (bookId: number) {
  return (await this.get(`/books/${bookId}`)).data as Book;
};

api.fetchReviewsForBook = async function (bookId: number) {
  return (await this.get(`/reviews/book/${bookId}`)).data as Review[];
};

api.postReview = async function (reviewPostRequest: ReviewPostRequest) {
  return (await this.post(`/reviews`, reviewPostRequest)).data as Review;
};

api.logout = async function () {
  const logoutRequest: LogoutRequest = {
    token: localStorage.getItem("token") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  };
  await this.post("/auth/logout", logoutRequest);
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  return;
};

api.fetchUserLoans = async function () {
  return (await this.get("/loans/user/current")).data as Loan[];
};

api.fetchAllLoans = async function () {
  return (await this.get("/loans")).data as Loan[];
};

api.fetchOverdueLoans = async function () {
  return (await this.get("/loans/overdue")).data as Loan[];
};

api.requestBookLoan = async function (bookId: number) {
  return (await this.post("/loans", null, { params: { bookId } })).data as Loan;
};

api.returnBookLoan = async function (loanId: number) {
  return (await this.patch(`/loans/${loanId}/return`)).data as Loan;
};

api.approveLoan = async function (loanId: number) {
  return (await this.patch(`/loans/${loanId}/approve`)).data as Loan;
};

api.approveReturn = async function (loanId: number) {
  return (await this.patch(`/loans/${loanId}/approve-return`)).data as Loan;
};

api.addBook = async function (book: BookPostRequest) {
  return (await this.post("/books", book)).data as Book;
};

api.editBook = async function (bookId: number, book: Book) {
  return (await this.put(`/books/${bookId}`, book)).data as Book;
};

api.deleteBook = async function (bookId: number) {
  return await this.delete(`/books/${bookId}`);
};

api.editReview = async function (reviewId: number, review: Review) {
  return (await this.put(`/reviews/${reviewId}`, review)).data as Review;
};

api.deleteReview = async function (reviewId: number) {
  return await this.delete(`/reviews/${reviewId}`);
};

api.searchLoansByUsernames = async function (username: string) {
  return (await this.get("/loans", { params: { username } })).data as Loan[];
};

//Append jwt to auth header, whenever the request is not to send to the authentication controller
api.interceptors.request.use(
  (config) => {
    // If the URL does not begin with /auth, add the Authorization header
    if (!config.url?.startsWith("/auth")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    // If there's an error in the request configuration, just throw it back to axios
    return Promise.reject(error);
  }
);

//Refresh token when jwt is expired
api.interceptors.response.use(
  (response) => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the server returns a 401 error (Unauthorized) and the error message is 'jwt expired'
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      delete api.defaults.headers.common["Authorization"];
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post("http://localhost:8080/auth/refresh", {
        token: token,
        refreshToken: refreshToken,
      });

      // If refresh is successful, update the token in localStorage and in the axios headers
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);

        // Retry the original request. The interceptor will add the new token to the Authorization header.
        return api(originalRequest);
      } else if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    }

    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

export default api;
