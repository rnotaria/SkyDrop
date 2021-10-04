import axios from "axios";

const baseUrl = process.env.baseURL || "http://localhost:8080";

const fetchData = async (address) => {
  try {
    const res = await axios({
      method: "GET",
      url: baseUrl + "/api/receive",
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
