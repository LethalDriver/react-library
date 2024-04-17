import { useEffect, useState } from "react";
import { api } from "../service/httpService";
import { Input, Stack } from "@chakra-ui/react";

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
  coverImage: string;
};

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await api.fetchBooks();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, [search]);
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log(search);
  };

  return (
    <Stack spacing={4}>
      <Input
        value={search}
        onChange={onSearchChange}
        placeholder="Search books"
      />
    </Stack>
  );
};

export default Books;
