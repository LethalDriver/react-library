import { Flex } from "@chakra-ui/react";
import { useAuth } from "../../service/authProvider";
import UserCardComponent from "./UserCardComponent";

const ProfileComponent = () => {
  const { user } = useAuth();

  return (
    <Flex minH={"calc(100vh - 14rem)"} align={"center"} justify={"center"}>
      <UserCardComponent user={user} />
    </Flex>
  );
};

export default ProfileComponent;
