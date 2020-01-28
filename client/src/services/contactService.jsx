import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/contact-us";

export function CreateContact(contact, address, phones, emails, store) {
  return http.post(apiEndpoint, {
    description: contact.description,
    mapUrl: contact.mapUrl,
    addresses: address,
    phones: phones,
    emails: emails,
    storeId: store._id
  });
}

export function getContact(store) {
  return http.get(apiEndpoint + "/" + store._id);
}
export function getStoreContact(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function deleteContact(id) {
  return http.delete(apiEndpoint + "/" + id);
}
export function getSingleContact(id) {
  return http.get(apiEndpoint + "/single/" + id);
}
export function updatecontact(id, obj) {
  return http.put(apiEndpoint + "/" + id, obj);
}
