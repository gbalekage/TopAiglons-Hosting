const axios = require("axios");

const enomApi = axios.create({
  baseURL: process.env.ENOM_BASE_URL,
  params: {
    uid: process.env.ENOM_USERNAME,
    token: process.env.ENOM_API_KEY,
    responseType: "json",
  },
});

const callApi = async (command, extraParams = {}) => {
  try {
    const response = await enomApi.get("/", {
      params: { command: command, ...extraParams },
    });
    return response.data;
  } catch (error) {
    console.error("Error in call api function:", error);
    throw new Error("Failed to make call to the enom Api");
  }
};

module.exports = { callApi };
