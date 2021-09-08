import axios from "axios";

const baseUrl = "http://localhost:8080/send";

// delete later - not needed
const testGet = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const sendService = { testGet };

export default sendService;
