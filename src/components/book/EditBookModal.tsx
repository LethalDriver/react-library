import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Book } from "../../types/bookTypes";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
                    <FormLabel>{t("title")}</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="author">
                {({ field }: any) => (
                  <FormControl id="author">
                    <FormLabel>{t("author")}</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="isbn">
                {({ field }: any) => (
                  <FormControl id="isbn">
                    <FormLabel>{t("isbn")}</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="publisher">
                {({ field }: any) => (
                  <FormControl id="publisher">
                    <FormLabel>{t("publisher")}</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="availableCopies">
                {({ field }: any) => (
                  <FormControl id="availableCopies">
                    <FormLabel>{t("available copies")}</FormLabel>
                    <Input type="number" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="genre">
                {({ field }: any) => (
                  <FormControl id="genre">
                    <FormLabel>{t("genre")}</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="imageUrl">
                {({ field }: any) => (
                  <FormControl id="imageUrl">
                    <FormLabel>{t("cover image url")}</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="summary">
                {({ field }: any) => (
                  <FormControl id="summary">
                    <FormLabel>{t("summary")}</FormLabel>
                    <Input type="text" {...field} />
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="teal" type="submit">
                {t("save")}
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
