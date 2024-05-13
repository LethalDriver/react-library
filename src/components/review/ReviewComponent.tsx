import { HStack, Stack, Text, Box, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";

type ReviewProps = {
  review: string;
  reviewDate: string;
  rating: number;
  username: string;
};

const ReviewComponent: React.FC<ReviewProps> = ({
  review,
  reviewDate,
  rating,
  username,
}) => {

  return (
    <Stack spacing={4} p={4} boxShadow="base" borderRadius="md" bg="white">
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
      <Text>
        {review}
      </Text>
    </Stack>
  );
};

export default ReviewComponent;