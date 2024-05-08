import axios, { AxiosInstance } from "axios";
import { Book } from "../types/bookTypes";
import {
  LoginRequest,
  LoginResponse,
  UserDetails,
  LogoutRequest,
} from "../types/authTypes";
import { Review, ReviewPostRequest } from "../types/reviewTypes";

interface ApiInstance extends AxiosInstance {
  login: (data: LoginRequest) => Promise<UserDetails>;
  logout: () => Promise<void>;
  userInfo: () => Promise<UserDetails | null>;
  fetchBooks: (title: string) => Promise<Book[]>;
  fetchBookDetails: (bookId: number) => Promise<Book>;
  fetchReviewsForBook: (bookId: number) => Promise<Review[]>;
  postReview: (reviewPostRequest: ReviewPostRequest) => Promise<Review>;
}

export const api = axios.create({
  baseURL: "http://localhost:8080",
}) as ApiInstance;

export const initializeAxios = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
};

api.login = async function (data: LoginRequest) {
  const response = (await this.post("/auth/login", data)).data as LoginResponse;
  localStorage.setItem("token", response.token);
  localStorage.setItem("refreshToken", response.refreshToken);
  api.defaults.headers.common["Authorization"] = "Bearer " + response.token;
  return response.user;
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
  delete this.defaults.headers.common["Authorization"];
  return;
};

api.interceptors.response.use(
  (response) => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the server returns a 403 error (Forbidden) and the error message is 'jwt expired'
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
        api.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;

        originalRequest.headers["Authorization"] = "Bearer " + res.data.token;

        // Retry the original request
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

initializeAxios();
export default api;
