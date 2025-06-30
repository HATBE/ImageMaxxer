import Pagination from "../Pagination";
import IJsonResponse from "./IJsonResponse";

export default class JsonResponse {
  private status: boolean;
  private message: string;
  private data?: any;
  private pagination?: Pagination;

  public constructor(
    status: boolean,
    message: string,
    data?: any,
    pagination?: Pagination
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }

  public getStatus(): boolean {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }

  public getData(): any | undefined {
    return this.data;
  }

  public getPagination(): Pagination | undefined {
    return this.pagination;
  }

  public generate(): IJsonResponse {
    return {
      status: this.getStatus(),
      message: this.getMessage(),
      data: this.getData(),
      pagination: this.getPagination(),
    };
  }

  public static _404(message: string): IJsonResponse {
    return new JsonResponse(false, message).generate();
  }

  public static _204(message: string): IJsonResponse {
    return new JsonResponse(true, message).generate();
  }
}
