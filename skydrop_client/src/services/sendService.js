import axios from "axios";

const baseUrl = "http://localhost:8080/test";

// delete later - not needed
const testGet = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const testPost = async (files) => {
  let formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await axios({
    method: "POST",
    url: baseUrl,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

const sendService = { testGet, testPost };

export default sendService;
