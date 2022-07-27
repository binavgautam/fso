import axios from "axios";
const url = "http://localhost:3001/api/users";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const userService = { getAll };

export default userService;
