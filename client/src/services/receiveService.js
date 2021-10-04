import axios from "axios";
import config from "../utils/config";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.development.baseUrl
    : config.production.baseUrl;

const fetchData = async (address) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: baseUrl,
      url: "/api/receive",
      responseType: "blob",
      headers: {
        address: address,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const receiveService = { fetchData };

export default receiveService;
