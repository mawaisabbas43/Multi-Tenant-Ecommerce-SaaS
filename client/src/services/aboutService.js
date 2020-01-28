import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/about-us";

export function createAbout(about, store) {
  return http.post(apiEndpoint, {
    description: about.description,
    info: about.info,
    moreInfo: about.moreInfo,
    storeId: store._id
  });
}

export function getAbout(store) {
  return http.get(apiEndpoint + "/" + store._id);
}
export function getStoreAbout(id) {
  return http.get(apiEndpoint + "/" + id);
}
export function getSingleAbout(id) {
  return http.get(apiEndpoint + "/single/" + id);
}

export function updateAbout(id, obj) {
  return http.put(apiEndpoint + "/" + id, obj);
}
export function deleteAbout(id) {
  return http.delete(apiEndpoint + "/" + id);
}
