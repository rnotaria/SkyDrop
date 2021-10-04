import axios from "axios";

const baseUrl = process.env.baseURL || "http://localhost:8080";

const send = async (files) => {
  let formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const res = await axios({
      method: "POST",
      url: baseUrl + "/api/send",
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
