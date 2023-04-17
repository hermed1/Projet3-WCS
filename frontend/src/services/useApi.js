import axios from "axios";

let apiSingleton = null;

const useApi = () => {
  if (!apiSingleton) {
    apiSingleton = axios.create({
      baseURL: "http://localhost:8000",
    });
  }
  return apiSingleton;
};

export default useApi;
