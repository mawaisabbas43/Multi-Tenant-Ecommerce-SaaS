import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/payments";

// export function getStripe(store) {
//   return http.get(apiEndpoint + "/" + store._id);
// }

export function updateCashOnDelivery(id, stripe) {
  return http.put(apiEndpoint + "/" + id, stripe);
}
