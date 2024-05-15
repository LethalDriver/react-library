import React, { useEffect } from "react";
import { useState } from "react";
import { Review, ReviewPostRequest } from "../../types/reviewTypes";
import { api } from "../../service/api";
import {
  HStack,
  Textarea,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ReviewComponent from "./ReviewComponent";
import { Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";

type ReviewsProps = {
  bookId: number;
};

const ReviewsComponent: React.FC<ReviewsProps> = ({ bookId }) => {
  const toast = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const StackComponent =
    useBreakpointValue({ base: VStack, md: HStack }) ?? Stack;
  const fetchReviews = async () => {
    try {
      const response = await api.fetchReviewsForBook(Number(bookId));
      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewReview(event.target.value);
  };

  const handleStarClick = (rating: number) => {
    setNewReviewRating(rating);
  };

  const handleReviewSubmit = async () => {
    if (newReview === "" || newReviewRating === 0) {
      toast({
        title: "Please fill out the review and rating",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const reviewPostRequest: ReviewPostRequest = {
      bookId: Number(bookId),
      rating: newReviewRating,
      reviewContent: newReview,
    };
    const review = await api.postReview(reviewPostRequest);
    setReviews([...reviews, review]);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Stack spacing={4}>
      <StackComponent
        spacing={4}
        borderRadius="lg"
        boxShadow="base" // Increase boxShadow to "xl" for a larger shadow
        p={4}
        border="1px" // Add a border
        borderColor={useColorModeValue("gray.900", "whiteAlpha.300")}
      >
        <Textarea
          value={newReview}
          onChange={handleReviewChange}
          placeholder="Add a review"
          borderColor={useColorModeValue("gray.200", "whiteAlpha.900")} // Set the border color explicitly
        />
        <VStack>
          <Stack direction="row">
            {[1, 2, 3, 4, 5].map((rating) => (
              <IconButton
                key={rating}
                icon={<StarIcon />}
                colorScheme={rating <= newReviewRating ? "teal" : "gray"}
                onClick={() => handleStarClick(rating)}
                aria-label={`Rate ${rating}`}
              />
            ))}
          </Stack>
          <Button onClick={handleReviewSubmit} w="full">
            Submit Review
          </Button>
        </VStack>
      </StackComponent>

      <Stack spacing={4}>
        {reviews.map((review) => (
          <ReviewComponent
            key={review.id}
            review={review}
            refetchReviews={fetchReviews}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default ReviewsComponent;
