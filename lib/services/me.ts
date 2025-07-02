import { GET } from "../adapters/adapters";
import { endpoints } from "../endponts";

export const getMe = async () => {
  const result = await GET(endpoints.me);
  return result;
};
