export type loginRequest = {
  email: string;
  password: string;
};

export type loginResponse = {
  token: string;
  refreshToken: string;
  user: userDetails;
};

export type userDetails = {
  id: number;
  email: string;
  username: string;
  name: string;
  role: string;
};

export type registerRequest = {
  fullName: string;
  email: string;
  password: string;
  username: string;
};
