import axios from "axios";

const baseUrl = "http://localhost:8080/api/receive";

const receive = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: baseUrl,
      responseType: "blob",
    });
    return res;
  } catch (error) {
    return error;
  }
};

const receiveService = { receive };

export default receiveService;
