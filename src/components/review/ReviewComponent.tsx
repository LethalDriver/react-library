import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../service/apiProvider";
import { useAuth } from "../../service/authProvider";
import { Review } from "../../types/reviewTypes";
import EditReviewModal from "./EditReviewModal";

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
  const api = useApi();
  const { t } = useTranslation();
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
            <StarIcon key={n} color={n <= rating ? "yellow.500" : "gray.300"} />
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
              {t("edit")}
            </Button>
          )}
          {isAdmin && (
            <Button colorScheme="red" onClick={handleDeleteReview}>
              {t("delete")}
            </Button>
          )}
        </HStack>
      </Box>
    </Stack>
  );
};

export default ReviewComponent;
