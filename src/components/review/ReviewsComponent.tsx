import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Stack,
  Textarea,
  VStack,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Review, ReviewPostRequest } from "../../types/reviewTypes";
import ReviewComponent from "./ReviewComponent";
import { useApi } from "../../service/apiProvider";
import { useTranslation } from "react-i18next";

type ReviewsProps = {
  bookId: number;
};

const ReviewsComponent: React.FC<ReviewsProps> = ({ bookId }) => {
  const toast = useToast();
  const api = useApi();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const { t } = useTranslation();
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
        title: t("please fill out the review and rating"),
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
        boxShadow="base"
        p={4}
        border="1px"
        borderColor="gray.900"
      >
        <Textarea
          value={newReview}
          onChange={handleReviewChange}
          placeholder={t("add a review")}
          borderColor="gray.200"
        />
        <VStack>
          <Stack direction="row">
            {[1, 2, 3, 4, 5].map((rating) => (
              <IconButton
                key={rating}
                icon={<StarIcon />}
                colorScheme={rating <= newReviewRating ? "yellow" : "gray"}
                onClick={() => handleStarClick(rating)}
                aria-label={`Rate ${rating}`}
              />
            ))}
          </Stack>
          <Button onClick={handleReviewSubmit} w="full">
            {t("submit review")}
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
