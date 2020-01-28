import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/products";

export function CreateProduct(
  product,
  attributes,
  variants,
  selectedCategory,
  store
) {
  return http.post(apiEndpoint, {
    sku: product.sku,
    fname: product.fname,
    lname: product.lname,
    price: product.price,
    count: product.count,
    summary: product.summary,
    variantName: product.variantName,
    description: product.description,
    attributes: attributes,
    options: variants,
    categories: selectedCategory,
    storeId: store._id
  });
}

export function updateProduct(id, product, attributes, variants, categories) {
  return http.put(apiEndpoint + "/editProduct/" + id, {
    sku: product.sku,
    fname: product.fname,
    lname: product.lname,
    price: product.price,
    count: product.count,
    summary: product.summary,
    variantName: product.variantName,
    description: product.description,
    attributes: attributes,
    options: variants,
    categories: categories
  });
}
export function getProduct(store) {
  return http.get(apiEndpoint + "/store/" + store._id);
}
export function getStoreProduct(id) {
  return http.get(apiEndpoint + "/store/" + id);
}

export function getSingleProduct(id) {
  return http.get(apiEndpoint + "/single/" + id);
}
export function uploadImage(id, obj) {
  return http.put(apiEndpoint + "/images/" + id, obj);
}
export function updateProductCategory(id, obj) {
  return http.put(apiEndpoint + "/editProductCategory/" + id, {
    categories: obj
  });
}
export function deleteProduct(id) {
  return http.delete(apiEndpoint + "/" + id);
}
