import axios from "axios";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post("http://localhost:8080/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching /me");
  }
};

export const signup = async ({ username, password }) => {
  try {
    const response = await axios.post("http://localhost:8080/signup", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching /me");
  }
};
