import axios, { AxiosInstance } from "axios";

type loginRequest = {
  email: string;
  password: string;
};

type loginResponse = {
  token: string;
  refreshToken: string;
  userDto: userDto
  }

  export type userDto = {
    id: number;
    email: string;
    username: string;
    name: string;
    role: string;
  };

interface ApiInstance extends AxiosInstance {
  login: (data: loginRequest) => Promise<userDto>;
  userInfo: () => Promise<userDto | null>;
}

export const api = axios.create({
  baseURL: "http://localhost:8080",
}) as ApiInstance;

export const initializeAxios = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
};

api.login = async function (data: loginRequest) {
  const response = (await this.post("/auth/login", data)).data as loginResponse;
  localStorage.setItem("token", response.token);
  localStorage.setItem("refreshToken", response.refreshToken);
  return response.userDto;
};
 api.userInfo = async function () {
  try {
    return (await this.get("/users")).data as userDto;
  }
  catch (error) {
    console.error(error);
    return null;
}
 }

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
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Attempt to refresh the token
      const refreshToken = localStorage.getItem("refreshToken"); // replace with your refresh token
      const res = await axios.post("auth/refresh", { token: refreshToken }); // replace with your refresh token endpoint

      // If refresh is successful, update the token in localStorage and in the axios headers
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        api.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;

        // Retry the original request
        return api(originalRequest);
      }
    }

    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

initializeAxios();
export default api;
