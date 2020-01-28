import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/stores";

export function createStore(store, user) {
  return http.post(apiEndpoint, {
    name: store.name,
    description: store.description,
    userId: user._id,
    theme: store.theme
  });
}
export function getStores() {
  return http.get(apiEndpoint);
}
export function getStore(user) {
  return http.get(apiEndpoint + "/single/" + user);
}
export function getUserStore(user) {
  return http.get(apiEndpoint + "/" + user._id);
}
export function updateStore(storeId, obj) {
  return http.put(apiEndpoint + "/" + storeId, obj);
}
