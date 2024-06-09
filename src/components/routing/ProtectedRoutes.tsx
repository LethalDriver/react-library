import { Flex, Spinner } from "@chakra-ui/react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../service/authProvider";

export const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};
