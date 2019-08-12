import http from "../httpService";

const apiEndpoint = "/history";

export function getHistory(year, month) {
  return http.get(apiEndpoint + "/" + year + "/" + month);
}
