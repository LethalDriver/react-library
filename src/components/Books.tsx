import { useEffect, useState } from "react";
import { api } from "../service/api";
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import BookCard from "./BookCard";
import { SearchIcon } from "@chakra-ui/icons";

export type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  avaiableCopies: number;
  bookDetails: BookDetails;
};

export type BookDetails = {
  genre: string;
  summary: string;
  coverImageUrl: string;
};

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
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

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={4} px={4}>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            value={search}
            onChange={onSearchChange}
            placeholder="Search books"
          />
          <Button
            bg={"blue.400"}
            textColor={"white"}
            onClick={onSearchButtonClick}
          >
            Search
          </Button>
        </InputGroup>
      </Stack>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            imageUrl={book.bookDetails.coverImageUrl}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default Books;
