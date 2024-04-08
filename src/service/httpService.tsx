import axios from "axios";

type loginRequest = {
    email: string;
    password: string;
    };

export const api = axios.create({
  baseURL: "localhost:8080"
});

export const login = async (data: loginRequest) => {
    return await api.post("/auth/login", data);
}

api.interceptors.response.use(
    response => {
      // If the request succeeds, we don't have to do anything and just return the response
      return response;
    },
    async error => {
      const originalRequest = error.config;
  
      // If the server returns a 403 error (Forbidden) and the error message is 'jwt expired'
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem('refreshToken'); // replace with your refresh token
        const res = await axios.post('auth/refresh', { token: refreshToken }); // replace with your refresh token endpoint
  
        // If refresh is successful, update the token in localStorage and in the axios headers
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
  
          // Retry the original request
          return api(originalRequest);
        }
      }
  
      // If the error is due to other reasons, we just throw it back to axios
      return Promise.reject(error);
    }
  );
  
  export default api;

