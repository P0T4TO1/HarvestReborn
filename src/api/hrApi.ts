import axios from "axios";

const hrApi = axios.create({
  baseURL: "/api",
});

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default hrApi;
export { serverApi };
