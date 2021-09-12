import axios from "axios";
import download from "downloadjs";

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

    console.log("RESPONSE:");
    console.log(res);
    console.log(res.config.headers.address);

    return res;
  } catch (error) {
    console.log("ERROR:");
    console.log(error);
    throw error;
  }
};

const downloadAll = (res) => {
  const content = res.headers["content-type"];
  download(res.data, "temp", content);
};

const receiveService = { fetchData };

export default receiveService;
