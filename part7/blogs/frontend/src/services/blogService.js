import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const tokenSetter = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const createComment = async (id, newComment) => {
  console.log("service");
  console.log(id);
  console.log(newComment);
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment);
  return response.data;
};

const updateBlog = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const blogService = {
  getAll,
  tokenSetter,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
};
export default blogService;
