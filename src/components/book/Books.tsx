import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useApi } from "../../service/apiProvider";
import { useAuth } from "../../service/authProvider";
import { Book, BookPostRequest } from "../../types/bookTypes";
import BookCard from "./BookCard";
import BookModal from "./BookModal";

const Books = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const api = useApi();
  const { user } = useAuth();
  const isAdmin = user?.role === "LIBRARIAN";
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const fetchBooks = async () => {
    const fetchedBooks = await api.fetchBooks(search);
    setBooks(fetchedBooks);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onSearchButtonClick = () => {
    fetchBooks();
  };

  const handleAddBook = async (values: BookPostRequest) => {
    api.addBook(values);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Stack spacing={4}>
      <BookModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleAddBook}
        isEditing={false}
      />
      <Stack
        direction="row"
        spacing={4}
        p={4}
        boxShadow="base"
        borderRadius="md"
        bg="white"
      >
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            value={search}
            onChange={onSearchChange}
            placeholder={t("search books")}
          />
        </InputGroup>
        <Button
          bg={"blue.400"}
          textColor={"white"}
          onClick={onSearchButtonClick}
        >
          {t("search")}
        </Button>
        {isAdmin && (
          <Button bg={"green.400"} textColor={"white"} onClick={onOpen}>
            {t("add book")}
          </Button>
        )}
      </Stack>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {" "}
        {books.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id}>
            <BookCard
              title={book.title}
              author={book.author}
              imageUrl={book.bookDetails.coverImageUrl}
            />
          </Link>
        ))}
      </Grid>
    </Stack>
  );
};

export default Books;
