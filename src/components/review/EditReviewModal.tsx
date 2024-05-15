import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: string;
  handleEditReview: (review: string) => void;
}

const EditReviewModal: React.FC<EditReviewModalProps> = ({
  isOpen,
  onClose,
  review,
  handleEditReview,
}) => {
    const [reviewContent, setReviewContent] = useState<string>(review);
    const handleEditChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewContent(event.target.value);
    };
    const handleEditSubmit = () => {
        handleEditReview(reviewContent);
        onClose();
    }
  return (
    
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea value={reviewContent} onChange={handleEditChange} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditReviewModal;
