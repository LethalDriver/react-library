export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthenticationResponse = {
  token: string;
  refreshToken: string;
  user: UserDetails;
};

export type UserDetails = {
  id: number;
  email: string;
  username: string;
  name: string;
  role: Role;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  username: string;
};



export type LogoutRequest = {
  token: string;
  refreshToken: string;
};

export type Role = "READER" | "LIBRARIAN";
