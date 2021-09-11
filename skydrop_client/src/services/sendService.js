import axios from "axios";

const baseUrl = "http://localhost:8080/api/send";

const send = async (files) => {
  let formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const res = await axios({
      method: "POST",
      url: baseUrl,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

const sendService = { send };

export default sendService;
