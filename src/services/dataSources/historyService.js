import http from "../httpService";

const apiEndpoint = "/history";

export function getHistory(period) {
  return http.get(apiEndpoint + "/" + period);
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
