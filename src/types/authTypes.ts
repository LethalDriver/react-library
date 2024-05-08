export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  user: UserDetails;
};

export type UserDetails = {
  id: number;
  email: string;
  username: string;
  name: string;
  role: string;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  username: string;
};

export type LogoutRequest = {
  token: string;
  refreshToken: string;
};
