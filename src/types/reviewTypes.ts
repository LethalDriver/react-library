export type Review = {
  id: number;
  review: string;
  reviewDate: string;
  rating: number;
  bookId: number;
  username: string;
};

export type ReviewPostRequest = {
    review: string;
    rating: number;
    bookId: number;
    };
