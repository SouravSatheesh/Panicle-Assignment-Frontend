import axios from "axios";

const instance = axios.create({
  baseURL: "https://panicle-backend.herokuapp.com/api/",
});

export default instance;
