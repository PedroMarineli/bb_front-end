export interface IApiResponse {
  content: IMesa[],
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface IDeskNumber {
  deskNumber?: number | undefined
}

export interface IDeskId {
  id: number
}

export interface IMesa {
  id?: number | undefined,
  filled?: boolean
}