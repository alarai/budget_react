import http from "../httpService";

const apiEndpoint = "/history";

export function getHistory(year, month) {
  return http.get(apiEndpoint + "/" + year + "/" + month);
}

export function getHistoryPeriods() {
  return http.get(apiEndpoint + "/periods");
}

export function getHistoryYears() {
  return http.get(apiEndpoint + "/years");
}

export function getHistoryByYear(year) {
  return http.get(apiEndpoint + "/" + year);
}
