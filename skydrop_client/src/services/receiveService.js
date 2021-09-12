import axios from "axios";

const baseUrl = "http://localhost:8080/api/receive";

const receive = async (address) => {
  try {
    const res = await axios({
      method: "GET",
      url: baseUrl,
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

const receiveService = { receive };

export default receiveService;
