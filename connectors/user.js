import axios from "axios";

export const getUser = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/user", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching /getUser");
  }
};
