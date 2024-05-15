"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import api from "../../service/api";
import { Book } from "../../types/bookTypes";
import ReviewsComponent from "../review/ReviewsComponent";
import { useAuth } from "../../service/authProvider";
import EditBookModal from "./EditBookModal";

export default function BookDetails() {
  const { user } = useAuth();
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

  const handleBookDelete = async () => {
    try {
      await api.deleteBook(Number(bookId));
      toast({
        title: "Book deleted",
        description: "The book has been deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/books");
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Failed to delete book",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleBookEdit = async (book: Book) => {
    try {
      await api.editBook(Number(bookId), book);
      fetchBookDetails();
      toast({
        title: "Book updated",
        description: "The book has been updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Failed to update book",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  const requestLoan = async () => {
    try {
      await api.requestBookLoan(Number(bookId));
      toast({
        title: "Loan request sent",
        description: "Your request has been sent to the librarian",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Failed to request loan",
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
        py={{ base: 0, lg: 8 }}
      >
        <Flex justifyContent="center" alignItems="center">
          <Image
            rounded={"md"}
            alt={"product image"}
            src={book?.bookDetails.coverImageUrl.replace(/zoom=1/, "zoom=0")}
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
                Book Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Author:
                  </Text>{" "}
                  {book?.author}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Genre:
                  </Text>{" "}
                  {book?.bookDetails.genre}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Publisher:
                  </Text>{" "}
                  {book?.publisher}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Isbn:
                  </Text>{" "}
                  {book?.isbn}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Avaiable copies:
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
                Edit Book
              </Button>
              {book && (
                <EditBookModal
                  book={book}
                  isOpen={isOpen}
                  onClose={onClose}
                  updateBook={handleBookEdit}
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
                Delete Book
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
              Borrow book
            </Button>
          )}
        </Stack>
      </SimpleGrid>
      <ReviewsComponent bookId={Number(bookId)} />
    </Container>
  );
}
