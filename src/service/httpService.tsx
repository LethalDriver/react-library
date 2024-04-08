import axios from "axios";

type loginRequest = {
    email: string;
    password: string;
    };

export const httpService = axios.create({
  baseURL: "localhost:8080"
});

export const login = async (data: loginRequest) => {
    return httpService.post("/login", data);
}
