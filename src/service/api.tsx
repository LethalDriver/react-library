import axios, { AxiosInstance } from "axios";
import { Book } from "../types/bookTypes";
import { loginRequest, loginResponse, userDetails } from "../types/authTypes";

interface ApiInstance extends AxiosInstance {
  login: (data: loginRequest) => Promise<userDetails>;
  userInfo: () => Promise<userDetails | null>;
  fetchBooks: (title: string) => Promise<Book[]>;
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

api.login = async function (data: loginRequest) {
  const response = (await this.post("/auth/login", data)).data as loginResponse;
  localStorage.setItem("token", response.token);
  localStorage.setItem("refreshToken", response.refreshToken);
  api.defaults.headers.common["Authorization"] = "Bearer " + response.token;
  return response.user;
};

api.userInfo = async function () {
  try {
    return (await this.get("/users")).data as userDetails;
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
