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

export function getCategory(id) {
  return http.get(getIdUrl(id));
}

export function saveCategory(category) {
  if (!category.id) {
    return http.post(apiEndpoint, category);
  } else {
    const body = { ...category };
    delete body.id;
    return http.put(getIdUrl(category.id), body);
  }
}
