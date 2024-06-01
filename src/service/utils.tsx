export const getErrorMessage = (error: any): string => {
  if (error.response && error.response.data && error.response.data.detail) {
    return error.response.data.detail;
  }
  return "Unknown error occurred.";
};
