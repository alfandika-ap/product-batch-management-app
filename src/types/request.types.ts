export interface RequestResponse<T> {
  data: T;
  message: string;
  status: number;
}