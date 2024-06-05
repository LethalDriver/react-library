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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Book, BookPostRequest } from "../../types/bookTypes";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useApi } from "../../service/apiProvider";
import { getErrorMessage } from "../../service/utils";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  availableCopies: Yup.number().required("Available copies is required"),
});

export default function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const api = useApi();
  const handleSubmit = async (values: any) => {
    const newBook: BookPostRequest = {
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
    try {
      await api.addBook(newBook);
      toast({
        title: t("book added"),
        description: t("book added description"),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: t("error occured"),
        description: t("failed to add book"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("add book")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: "",
              author: "",
              isbn: "",
              publisher: "",
              availableCopies: 0,
              genre: "",
              imageUrl: "",
              summary: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="title">
                {({ field }: any) => (
                  <FormControl id="title">
                    <FormLabel>{t("book title")}</FormLabel>
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
                <Button mt={4} colorScheme="green" type="submit">
                  {t("save")}
                </Button>
              </Flex>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
