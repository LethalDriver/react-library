import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../service/authProvider";
import { useApi } from "../service/apiProvider";
import { useTranslation } from "react-i18next";
import book from "../assets/book.png";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useAuth();
  const isAdmin = user?.role === "LIBRARIAN";
  const navigate = useNavigate();
  const toast = useToast();
  const api = useApi();
  const { t } = useTranslation();

  const links = ["Home"];
  if (user) {
    links.push("Books", "Loans");
    if (isAdmin) {
      links.push("Users");
    }
  }

  const handleSignInClick = () => {
    navigate("/login");
  };
  const handleSignUpClick = () => {
    navigate("/register");
  };

  const clearUser = () => {
    setUser(null);
  };

  const handleLogoutClick = async () => {
    try {
      await api.logout();
      clearUser();
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image src={book} alt={"logo"} width={50} />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link) => (
                <Link key={link} to={`/${link.toLowerCase()}`}>
                  <NavLink>{t(link.toLowerCase())}</NavLink>
                </Link>
              ))}
            </HStack>
          </HStack>
          {user ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  rightIcon={<ChevronDownIcon />}
                >
                  <Text>{user.email}</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleProfileClick}>
                    {t("profile")}
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick}>{t("logout")}</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"#"}
                onClick={handleSignInClick}
              >
                {t("sign in")}
              </Button>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                _hover={{
                  bg: "blue.300",
                }}
                onClick={handleSignUpClick}
              >
                {t("sign up")}
              </Button>
            </Stack>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links.map((link) => (
                <Link key={link} to={`/${link.toLowerCase()}`}>
                  <NavLink key={link}>{t(link.toLowerCase())}</NavLink>
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
