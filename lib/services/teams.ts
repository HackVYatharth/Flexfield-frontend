import { API_BASE_URL, GET } from "../adapters/adapters";

export const getAllTeams = async () => {
    const response = await GET("/api/data/teams");
    return response;
}