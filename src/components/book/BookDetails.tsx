"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../service/authProvider";
import { Book, BookPostRequest } from "../../types/bookTypes";
import ReviewsComponent from "../review/ReviewsComponent";
import { useApi } from "../../service/apiProvider";
import { useTranslation } from "react-i18next";
import BookModal from "./BookModal";

export default function BookDetails() {
  const { user } = useAuth();
  const api = useApi();
  const navigate = useNavigate();
  const isAdmin = user?.role === "LIBRARIAN";
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const fetchBookDetails = async () => {
    const response = await api.fetchBookDetails(Number(bookId));
    setBook(response);
  };
  const { t } = useTranslation();

  const handleBookDelete = async () => {
    try {
      await api.deleteBook(Number(bookId));
      toast({
        title: t("book deleted"),
        description: t("book deleted description"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/books");
    } catch (error) {
      toast({
        title: t("error occured"),
        description: t("failed to delete book"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleBookEdit = async (book: Book | BookPostRequest) => {
    if (book && "id" in book) {
      setBook(await api.editBook(book.id, book));
    }
  };

  const requestLoan = async () => {
    try {
      await api.requestBookLoan(Number(bookId));
      toast({
        title: t("loan request sent"),
        description: t("request sent description"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: t("error occured"),
        description: t("failed to request loan"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    fetchBookDetails();
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 4, lg: 8 }}
      >
        <Flex justifyContent="center" alignItems="center">
          <Image
            rounded={"md"}
            alt={"product image"}
            src={
              book?.bookDetails.coverImageUrl
                ? book?.bookDetails.coverImageUrl.replace(/zoom=1/, "zoom=0")
                : "https://placehold.co/588x882/D3D3D3/FFFFFF/?text=?"
            }
            maxW={"100%"}
            maxH={"100%"}
            objectFit="contain"
          />
        </Flex>
        <Stack
          spacing={{ base: 6, md: 10 }}
          justifyContent={"space-between"}
          py={{ base: 0, md: 16 }}
        >
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {book?.title}
              </Heading>
            </Box>
            <Box>
              <Text fontSize={"lg"} textAlign="justify">
                {book?.bookDetails.summary}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                {t("book details")}
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {t("author")}:
                  </Text>{" "}
                  {book?.author}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {t("genre")}:
                  </Text>{" "}
                  {book?.bookDetails.genre}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {t("publisher")}:
                  </Text>{" "}
                  {book?.publisher}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {t("isbn")}:
                  </Text>{" "}
                  {book?.isbn}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {t("available copies")}:
                  </Text>{" "}
                  {book?.availableCopies}
                </ListItem>
              </List>
            </Box>
          </Stack>
          {isAdmin ? (
            <Stack spacing={4}>
              <Button
                rounded={"none"}
                w={"full"}
                size={"lg"}
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={onOpen}
              >
                {t("edit book")}
              </Button>
              {book && (
                <BookModal
                  isOpen={isOpen}
                  onClose={onClose}
                  onConfirm={handleBookEdit}
                  isEditing={true}
                  book={book}
                />
              )}
              <Button
                rounded={"none"}
                w={"full"}
                size={"lg"}
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={handleBookDelete}
              >
                {t("delete book")}
              </Button>
            </Stack>
          ) : (
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={requestLoan}
            >
              {t("borrow book")}
            </Button>
          )}
        </Stack>
      </SimpleGrid>
      <ReviewsComponent bookId={Number(bookId)} />
    </Container>
  );
}
