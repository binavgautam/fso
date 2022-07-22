import axios from "axios";

const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(url, anecdote);
  return response.data;
};

const vote = async (id, anecdote) => {
  const response = await axios.put(`${url}/${id}`, anecdote);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

const anecdoteService = { getAll, createNew, vote, remove };
export default anecdoteService;
