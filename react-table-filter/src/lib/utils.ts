import axios, { AxiosResponse } from "axios";
import { User } from "../constants/commontypes";

export const getUser = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(
      "http://localhost:3000/people"
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
