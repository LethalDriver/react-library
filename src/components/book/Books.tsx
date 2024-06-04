import { useState } from "react";
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import BookCard from "./BookCard";
import { SearchIcon } from "@chakra-ui/icons";
import { Book } from "../../types/bookTypes";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useApi } from "../../service/apiProvider";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../service/authProvider";
import AddBookModal from "./AddBookModal";

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

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Stack spacing={4}>
      <AddBookModal isOpen={isOpen} onClose={onClose} />
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
