export type QueryOptions = {
  page?: number;
  limit?: number;
  skip?: number;
  search?: string;
  select?: string;
  q?: string
};

export type ResponsePagination<T> = {
  products: T[];
  total: number;
  skip: number;
  limit: number;
};
