export default interface Pagination {
  page: number;
  maxCount: number;
  maxPages: number;
  hasNextPage: boolean;
  hasLastPage: boolean;
  limit: number;
}
