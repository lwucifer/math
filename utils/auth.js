import Cookie from "js-cookie";
import { SCHOOLLY_ACCESS_TOKEN, TOKEN_USER } from "./config";

/**
 * get access_token from local storage
 */
export const getAccessToken = () => {
    if (process.server) return;
    return window.localStorage.getItem(SCHOOLLY_ACCESS_TOKEN);
};

/**
 * get bearer token from local storage
 */
export const getToken = () => {
    if (process.server) return;
    const token = window.localStorage.getItem(TOKEN_USER);
    return token ? JSON.parse(token) : null;
};

/**
 * set bearer token after login success
 */
export const setAccessToken = accessToken => {
    if (!accessToken) return;
    Cookie.set(SCHOOLLY_ACCESS_TOKEN, accessToken, {
        expires: parseInt(process.env.SESSION_EXPIRES)
    });
    if (process.server) return;
    window.localStorage.setItem(SCHOOLLY_ACCESS_TOKEN, accessToken);
};

export const setToken = _token => {
    if (!_token) return;
    Cookie.set(TOKEN_USER, _token, {
        expires: parseInt(process.env.SESSION_EXPIRES)
    });
    if (process.server) return;
    window.localStorage.setItem(TOKEN_USER, JSON.stringify(_token));
};

export const removeToken = () => {
    Cookie.remove(SCHOOLLY_ACCESS_TOKEN);
    Cookie.remove(TOKEN_USER);
    if (process.server) return;
    window.localStorage.removeItem(SCHOOLLY_ACCESS_TOKEN);
    window.localStorage.removeItem(TOKEN_USER);
};

export const isAuthenticated = () => {
    return !!getToken();
};

/**
 * Get raw jwt token from cookie
 */
export const getTokenFromCookie = req => {
    if (!req || !req.headers || !req.headers.cookie) return;
    const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith(TOKEN_USER));
    if (!jwtCookie) return null;
    const userCookie = decodeURIComponent(jwtCookie.split("=")[1]);
    return typeof userCookie === "string" ? JSON.parse(userCookie) : userCookie;
};

/**
 * get access_token from cookie
 */
export const getAccessTokenFromCookie = req => {
    if (!req || !req.headers || !req.headers.cookie) return;
    const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith(SCHOOLLY_ACCESS_TOKEN));
    if (!jwtCookie) return null;
    const userCookie = jwtCookie.split("=")[1];
    return userCookie;
};

export const checkRequestAuthorize = _url => {
    // const urls = _url.split('?');
    // console.log("urls", urls);

    // if url contain token=true => return true;
    if (_url.includes("token=true")) return true;

    // public api url
    if (_url.includes("/login")) return false;

    // public api
    // if (UNAUTHORIZE_API.includes(urls[0])) {
    //   return false;
    // }

    return true;
};