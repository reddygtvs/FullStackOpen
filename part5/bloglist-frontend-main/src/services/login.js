import axios from "axios";
const baseUrl = "http://localhost:3000/api/login";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
export default { login };
