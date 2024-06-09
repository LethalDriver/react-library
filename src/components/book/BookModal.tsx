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
  Flex,
  Textarea,
  useToast,
  Text,
  Stack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Book, BookPostRequest } from "../../types/bookTypes";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useApi } from "../../service/apiProvider";
import { useMemo } from "react";

interface BookModalProps {
  book?: Book;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (book: Book | BookPostRequest) => void;
  isEditing: boolean;
}

export default function BookModal({
  book,
  isOpen,
  onClose,
  onConfirm,
  isEditing,
}: BookModalProps) {
  const { t } = useTranslation();
  const toast = useToast();

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      title: Yup.string().required(t("title required")),
      author: Yup.string().required(t("author required")),
      availableCopies: Yup.number().required(t("available copies required")),
    });
  }, []);

  const handleSubmit = async (values: any) => {
    const bookData: Book | BookPostRequest = {
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

    if (isEditing && book) {
      (bookData as Book).id = book.id;
    }

    try {
      await onConfirm(bookData);
      toast({
        title: isEditing ? t("book updated") : t("book added"),
        description: isEditing
          ? t("book updated description")
          : t("book added description"),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: t("error occured"),
        description: isEditing
          ? t("failed to update book")
          : t("failed to add book"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const initialValues =
    isEditing && book
      ? {
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publisher: book.publisher,
          availableCopies: book.availableCopies,
          genre: book.bookDetails.genre,
          imageUrl: book.bookDetails.coverImageUrl,
          summary: book.bookDetails.summary,
        }
      : {
          title: "",
          author: "",
          isbn: "",
          publisher: "",
          availableCopies: 0,
          genre: "",
          imageUrl: "",
          summary: "",
        };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? t("edit book") : t("add book")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, dirty, isValid }) => (
              <Form>
                <Stack direction="column" spacing={4}>
                  <Field name="title">
                    {({ field }: any) => (
                      <FormControl
                        id="title"
                        isInvalid={Boolean(errors.title && touched?.title)}
                      >
                        <FormLabel>{t("book title")}</FormLabel>
                        <Input type="text" {...field} />
                        <ErrorMessage
                          name="title"
                          component={(props) => (
                            <Text color="red.500" align={"start"} {...props} />
                          )}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="author">
                    {({ field }: any) => (
                      <FormControl
                        id="author"
                        isInvalid={Boolean(errors.author && touched?.author)}
                      >
                        <FormLabel>{t("author")}</FormLabel>
                        <Input type="text" {...field} />
                        <ErrorMessage
                          name="author"
                          component={(props) => (
                            <Text color="red.500" align={"start"} {...props} />
                          )}
                        />
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
                        <FormLabel>{t("image url")}</FormLabel>
                        <Input type="text" {...field} />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="summary">
                    {({ field }: any) => (
                      <FormControl id="summary">
                        <FormLabel>{t("summary")}</FormLabel>
                        <Textarea {...field} />
                      </FormControl>
                    )}
                  </Field>
                  <Flex justifyContent="center">
                    <Button
                      colorScheme="green"
                      type="submit"
                      isDisabled={!isValid || !dirty}
                    >
                      {t("save")}
                    </Button>
                  </Flex>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
