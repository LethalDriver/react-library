import { HStack, Stack, Text, Box } from "@chakra-ui/react";
import React from "react";

const Review = () => {
  return (
    <Stack spacing={4} p={4} boxShadow="base" borderRadius="md" bg="white">
      <HStack spacing={4}>
        <Box boxSize="50px" bg="gray.200" />
        <Stack spacing={1}>
          <Text fontWeight="bold">Reviewer Name</Text>
          <Text fontSize="sm" color="gray.500">
            Date of Review
          </Text>
        </Stack>
      </HStack>
      <Text>
        Review content goes here. This is where the reviewer's comments will be
        displayed.
      </Text>
    </Stack>
  );
};

export default Review;
