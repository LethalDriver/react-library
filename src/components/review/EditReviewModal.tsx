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
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
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
        <ModalHeader>
          {t("edit review")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea value={reviewContent} onChange={handleEditChange} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
            {t("submit")}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t("cancel")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditReviewModal;
