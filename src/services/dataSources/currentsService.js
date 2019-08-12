import http from "../httpService";

const apiEndpoint = "/currents";

function getIdUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCurrents() {
  return http.get(apiEndpoint);
}

export function deleteCurrents(id) {
  return http.delete(getIdUrl(id));
}

export function getCurrent(id) {
  return http.get(getIdUrl(id));
}

export function saveCurrent(current) {
  if (!current.id) {
    return http.post(apiEndpoint, current);
  } else {
    const body = { ...current };
    delete body.id;
    return http.put(getIdUrl(current.id), body);
  }
}

export function addRecuring(recuringId) {
  return http.get(apiEndpoint + "/addrecur/" + recuringId);
}

export function checkCurrent(id) {
  return http.get(apiEndpoint + "/check/" + id);
}
