import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { Book } from "../../types/bookTypes";
import { Formik, Form, Field } from "formik";
import api from "../../service/api";

interface EditBookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  updateBook: (book: Book) => void;
}

export default function EditBookModal({
  book,
  isOpen,
  onClose,
  updateBook,
}: EditBookModalProps) {
  const handleSubmit = async (values: any) => {
    const updatedBook: Book = {
      id: book.id,
      title: values.title,
      author: values.author,
      isbn: values.isbn,
      publisher: values.publisher,
      availableCopies: values.availableCopies,
      bookDetails: {
        genre: values.genre,
        coverImageUrl: values.imageUrl,
        summary: values.summary,
      },
    };
    await updateBook(updatedBook);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: book.title,
              author: book.author,
              isbn: book.isbn,
              publisher: book.publisher,
              availableCopies: book.availableCopies,
              genre: book.bookDetails.genre,
              imageUrl: book.bookDetails.coverImageUrl,
              summary: book.bookDetails.summary,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="title">
                {({ field }: any) => (
                  <FormControl id="title">
                    <FormLabel>Book Title</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="author">
                {({ field }: any) => (
                  <FormControl id="author">
                    <FormLabel>Author</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="isbn">
                {({ field }: any) => (
                  <FormControl id="isbn">
                    <FormLabel>ISBN</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="publisher">
                {({ field }: any) => (
                  <FormControl id="publisher">
                    <FormLabel>Publisher</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="availableCopies">
                {({ field }: any) => (
                  <FormControl id="availableCopies">
                    <FormLabel>Available Copies</FormLabel>
                    <Input type="number" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="genre">
                {({ field }: any) => (
                  <FormControl id="genre">
                    <FormLabel>Genre</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="imageUrl">
                {({ field }: any) => (
                  <FormControl id="imageUrl">
                    <FormLabel>Cover Image URL</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="summary">
                {({ field }: any) => (
                  <FormControl id="summary">
                    <FormLabel>Summary</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
