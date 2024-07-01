type PaginatedResponse<T> = {
  dataList: T[];
  hasNextPage: boolean;
};
