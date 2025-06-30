import Pagination from "../Pagination";

export default interface IJsonResponse {
  status: boolean;
  message: string;
  data?: any;
  pagination?: Pagination;
}
