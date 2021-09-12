import axios from "axios";

const baseUrl = "http://localhost:8080/api/receive";

const fetchData = async (address) => {
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
    console.log("ERROR:");
    console.log(error);
    throw error;
  }
};

const receiveService = { fetchData };

export default receiveService;
