import axios from "axios";
import { API_BASE_URL } from "../adapters/adapters";
import { endpoints } from "../endponts";

interface UserType {
  playerName: String;
  playerEmail: String;
  playerPassword: String;
  confirmPassword: String;
  playerContactNumber: String;
  playerDateOfBirth: String;
  playerGender: String;
  playerPincode: String;
  playerTypeId: Number;
  playerSportId: Number;
}

interface UserWithTeamType {
  playerName: String;
  playerEmail: String;
  playerPassword: String;
  confirmPassword: String;
  playerContactNumber: String;
  playerDateOfBirth: String;
  playerGender: String;
  playerPincode: String;
  playerTypeId: Number;
  playerSportId: Number;
  teamName: String;
  teamContactNumber: String;
  teamEmail: String;
  teamSportId: Number;
  teamAbout: String;
  numberOfTeamMembers: Number;
}
export const signupUser = async (user: UserType) => {
  const result = await axios.post(API_BASE_URL + endpoints.auth.signup, user);
  return result;
};

export const signupUserWithTeam = async (user: UserWithTeamType) => {
  const result = await axios.post(API_BASE_URL + endpoints.auth.signup, user);
  return result;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: String;
  password: String;
}) => {
  const result = await axios.post(API_BASE_URL + endpoints.auth.login, {
    email,
    password,
  });
  return result;
};
