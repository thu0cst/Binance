import { sendGet } from "./axios";

export const getDataPrice = (payload) =>
  sendGet(`/fapi/v1/indexPriceKlines`, payload);
