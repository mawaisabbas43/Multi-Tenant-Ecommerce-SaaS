import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/feedbacks";

export function getFeedback(store) {
  return http.get(apiEndpoint + "/" + store._id);
}
export function getStoreFeedback(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function deleteFeedBack(id) {
  return http.delete(apiEndpoint + "/" + id);
}
