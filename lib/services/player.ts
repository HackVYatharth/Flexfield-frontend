import { API_BASE_URL, GET } from "../adapters/adapters";

export const getAllPlayers = async () => {
    const response = await GET("/api/data/players");
    return response;
}