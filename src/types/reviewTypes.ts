export type Review = {
  id: number;
  reviewContent: string;
  reviewDate: string;
  rating: number;
  bookId: number;
  username: string;
};

export type ReviewPostRequest = {
  reviewContent: string;
  rating: number;
  bookId: number;
};
