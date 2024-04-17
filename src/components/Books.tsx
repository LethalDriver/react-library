import React from 'react'

type Book = {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    avaiableCopies: number;
    bookDetails: BookDetails;
}

type BookDetails = {
    genre: string;
    summary: string;
    coverImage: string;
}

const Books = () => {
    []
  return (
    <div>Books</div>
  )
}

export default Books