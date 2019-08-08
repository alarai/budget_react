import http from "../httpService";

const apiEndpoint = "/types";

function getIdUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTypes() {
  return http.get(apiEndpoint);
}

export function deleteTypes(id) {
  return http.delete(getIdUrl(id));
}

export function getType(id) {
  return http.get(getIdUrl(id));
}

export function saveType(type) {
  if (!type.id) {
    return http.post(apiEndpoint, type);
  } else {
    const body = { ...type };
    delete body.id;
    return http.put(getIdUrl(type.id), body);
  }
}
