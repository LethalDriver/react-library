export type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  availableCopies: number;
  bookDetails: BookDetails;
};

export type BookPostRequest = {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  availableCopies: number;
  bookDetails: BookDetails;
};

export type BookDetails = {
  genre: string;
  summary: string;
  coverImageUrl: string;
};
