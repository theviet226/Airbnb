export const ACCESS_TOKEN: string = "accessToken"
export const AUTH_LOGIN: string = "authLogin"
export const PROFILE: string = "profile"
export const BOOKING: string = "booking"
export const TOKENCYBERSOFT: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc`

const authDataString = localStorage.getItem("authLogin");
export let TOKENUSER = '';
if (authDataString) {
  try {
    const authData = JSON.parse(authDataString);

    if (authData.token) {
      TOKENUSER = authData.token;
    } else {
      console.log("Token not found in the auth data.");
    }
  } catch (error) {
    console.error("Error parsing the auth data:", error);
  }
} else {
  console.log("Auth data not found in localStorage.");
}