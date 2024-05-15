import { HStack, Stack, Text, Box, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useMemo, useState } from "react";
import { useAuth } from "../../service/authProvider";
import { useDisclosure } from "@chakra-ui/react";
import EditReviewModal from "./EditReviewModal";
import api from "../../service/api";
import { Review } from "../../types/reviewTypes";

type ReviewProps = {
  review: Review;
  refetchReviews: () => void;
};

const ReviewComponent: React.FC<ReviewProps> = ({
  review: { id, username, reviewContent, reviewDate, rating, bookId },
  refetchReviews,
}) => {
  const [reviewContentState, setReviewContentState] =
    useState<string>(reviewContent);
  const { user } = useAuth();
  const isAdmin = user?.role === "LIBRARIAN";
  const isOwner = user?.username === username;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleEditReview = async (reviewContent: string) => {
    const reviewPutRequest = {
      id: id,
      reviewContent: reviewContent,
      rating: rating,
      reviewDate: reviewDate,
      bookId: bookId,
      username: username,
    };
    setReviewContentState(
      (await api.editReview(id, reviewPutRequest)).reviewContent
    );
  };
  const handleDeleteReview = async () => {
    await api.deleteReview(id);
    refetchReviews();
  };
  return (
    <Stack spacing={4} p={4} boxShadow="base" borderRadius="md" bg="white">
      <EditReviewModal
        isOpen={isOpen}
        onClose={onClose}
        review={reviewContent}
        handleEditReview={handleEditReview}
      />

      <Stack spacing={1}>
        <Text fontWeight="bold">{username}</Text>
        <Text fontSize="sm" color="gray.500">
          {reviewDate}
        </Text>
        <HStack spacing={1}>
          {[1, 2, 3, 4, 5].map((n) => (
            <StarIcon key={n} color={n <= rating ? "teal.500" : "gray.300"} />
          ))}
        </HStack>
      </Stack>
      <Text>{reviewContentState}</Text>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <HStack spacing={4}>
          {isOwner && (
            <Button colorScheme="blue" onClick={onOpen}>
              Edit
            </Button>
          )}
          {isAdmin && (
            <Button colorScheme="red" onClick={handleDeleteReview}>
              Delete
            </Button>
          )}
        </HStack>
      </Box>
    </Stack>
  );
};

export default ReviewComponent;
