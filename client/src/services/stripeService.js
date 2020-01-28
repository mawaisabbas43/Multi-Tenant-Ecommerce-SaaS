import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/payments";

export function getStripe(store) {
  return http.get(apiEndpoint + "/" + store._id);
}

export function updateStripe(id, stripe) {
  return http.put(apiEndpoint + "/stripe/" + id, stripe);
}
