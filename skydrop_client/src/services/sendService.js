import axios from "axios";

const baseUrl = "http://localhost:8080/test";

// delete later - not needed
const testGet = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

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
    return { error };
  }
};

const sendService = { testGet, send };

export default sendService;
