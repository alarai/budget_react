import http from "../httpService";

const apiEndpoint = "/categories";

function getIdUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCategories() {
  return http.get(apiEndpoint);
}

export function deleteCategories(id) {
  return http.delete(getIdUrl(id));
}
