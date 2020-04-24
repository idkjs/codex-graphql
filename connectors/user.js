import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get("http://localhost:8080/user", {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IlN0ZWluYXIiLCJleHAiOjE1ODc3NTYxNzR9.vEVt63lDKf4g0aLyOeNBnsFHDqjpOe74IVMAUSCwuWE",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching /me");
  }
};
