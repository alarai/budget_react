import http from "../httpService";

const apiEndpoint = "/recurings";

function getIdUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecurings() {
  return http.get(apiEndpoint);
}

export function deleteRecurings(id) {
  return http.delete(getIdUrl(id));
}

export function getRecuring(id) {
  return http.get(getIdUrl(id));
}

export function saveRecuring(recuring) {
  if (!recuring.id) {
    return http.post(apiEndpoint, recuring);
  } else {
    const body = { ...recuring };
    delete body.id;
    return http.put(getIdUrl(recuring.id), body);
  }
}
