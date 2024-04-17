import { useState } from 'react'

export type Book = {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    avaiableCopies: number;
    bookDetails: BookDetails;
}

export type BookDetails = {
    genre: string;
    summary: string;
    coverImage: string;
}

const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);

  return (
    <div>Books</div>
  )
}

export default Books