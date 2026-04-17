export interface ApiResponse<T> {
  timestamp: string;
  message: string;
  data: T;
}
