import { IMesa } from "./IMesa";

export interface IApiResponse {
  content: IMesa[],
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}