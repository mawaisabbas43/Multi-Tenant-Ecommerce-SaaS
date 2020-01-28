import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/payments";

export function getPaypal(store) {
  return http.get(apiEndpoint + "/" + store._id);
}

export function updatePaypal(id, paypal) {
  return http.put(apiEndpoint + "/paypal/" + id, paypal);
}
