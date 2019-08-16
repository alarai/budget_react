import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";
const logoutMessageKey = "logoutMessage";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt.token);
  window.location = "/budgetreact";
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout(message) {
  if (message) {
    localStorage.setItem(logoutMessageKey, message);
  }
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getLogoutMessage() {
  const message = localStorage.getItem(logoutMessageKey);
  if (message) {
    localStorage.removeItem(logoutMessageKey);
  }
  return message;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getLogoutMessage
};
