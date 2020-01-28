import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/categories";

export function createCategory(category, store) {
  return http.post(apiEndpoint, {
    name: category.name,
    storeId: store._id
  });
}
export function createSubCategory(subcategory, category) {
  return http.post(apiEndpoint, {
    name: subcategory.name,
    parent: category._id
  });
}
export function getCategories(store) {
  return http.get(apiEndpoint + "/" + store._id);
}
export function getAdminCategories(id) {
  return http.get(apiEndpoint + "/" + id);
}
export function getSingleCategory(id) {
  return http.get(apiEndpoint + "/single/" + id);
}

export function updateCategory(id, obj) {
  return http.put(apiEndpoint + "/" + id, obj);
}
export function deleteCategory(id) {
  return http.delete(apiEndpoint + "/" + id);
}
