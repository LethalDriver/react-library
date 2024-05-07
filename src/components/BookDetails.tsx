"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../service/api";
import { Book } from "../types/bookTypes";
import { Review } from "../types/reviewTypes";
import ReviewComponent from "./ReviewComponent";

export default function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchBookDetails = async () => {
    try {
      const response = await api.fetchBookDetails(Number(bookId));
      setBook(response);
    } catch (error) {
      console.error("Error fetching book details: ", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.fetchReviewsForBook(Number(bookId));
      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, []);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 0, lg: 24 }}
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
                  {book?.avaiableCopies.toString()}
                </ListItem>
              </List>
            </Box>
          </Stack>
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
          >
            Borrow book
          </Button>
          <Stack spacing={4}>
            {reviews.map((review) => (
              <ReviewComponent
                key={review.id}
                rating={review.rating}
                review={review.review}
                username={review.username}
                reviewDate={review.reviewDate}
              />
            ))}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
