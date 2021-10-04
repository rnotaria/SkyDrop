import axios from "axios";

const baseUrl = "/api/send";

const send = async (files) => {
  console.log(window.location.hostname + baseUrl);

  let formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const res = await axios({
      method: "POST",
      url: window.location.hostname + baseUrl,
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
