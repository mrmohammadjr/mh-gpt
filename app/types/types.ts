export interface Response {
  id?: Number;
  role?: "user" | "ai";
  message?: string;
}