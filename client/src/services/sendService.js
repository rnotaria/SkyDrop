import axios from "axios";
import config from "../utils/config";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.development.baseUrl
    : config.production.baseUrl;

const send = async (files) => {
  let formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const res = await axios({
      method: "POST",
      baseURL: baseUrl,
      url: "/api/send",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const sendService = { send };

export default sendService;
