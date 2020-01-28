import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/orders";

export function getOrders(store) {
  return http.get(apiEndpoint + "/store/" + store._id);
}
export function getSingleOrder(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function updateStatus(id, paypal) {
  return http.put(apiEndpoint + "/paypal/" + id, paypal);
}
export function updateOrderStatus(id, order) {
  return http.put(apiEndpoint + "/" + id, {
    status: order.status
  });
}
