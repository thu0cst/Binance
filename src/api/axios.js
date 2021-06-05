import Axios from "axios";

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: "https://fapi.binance.com",
});

export const sendGet = (url, params) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
