import Cookie from "js-cookie";
import {
    SCHOOLLY_ACCESS_TOKEN,
    TOKEN_USER_SCHOOLLY,
    UNAUTHORIZE_API,
    DEVICE_ID
} from "./config";

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
    const token = window.localStorage.getItem(TOKEN_USER_SCHOOLLY);
    return token ? JSON.parse(token) : null;
};

/**
 * get device_id from local storage
 */
export const getDeviceId = () => {
    if (process.server) return;
    return window.localStorage.getItem(DEVICE_ID);
};

/**
 * set bearer token after login success
 */
export const setAccessToken = accessToken => {
    // console.log("[setAccessToken]", accessToken);
    if (!accessToken) return;
    // console.log("[setAccessToken] Cookie", accessToken);
    Cookie.set(SCHOOLLY_ACCESS_TOKEN, accessToken, {
        expires: parseInt(process.env.SESSION_EXPIRES)
    });
    // console.log("[setAccessToken] process", accessToken);
    if (process.server) return;
    // console.log("[setAccessToken] localStorage", accessToken);
    window.localStorage.setItem(SCHOOLLY_ACCESS_TOKEN, accessToken);
};

export const setToken = _token => {
    // console.log("[setToken]", _token);
    if (!_token) return;
    // console.log("[setToken] Cookie", _token, Cookie);
    Cookie.set(TOKEN_USER_SCHOOLLY, _token, {
        expires: parseInt(process.env.SESSION_EXPIRES)
    });
    // console.log("[setToken] process", process.server);
    if (process.server) return;
    // console.log("[setToken] localStorage", _token);
    window.localStorage.setItem(TOKEN_USER_SCHOOLLY, JSON.stringify(_token));
};

export const setDeviceId = _deviceId => {
    console.log("[auth][setDeviceId]",_deviceId);
    if (!_deviceId) return;
    Cookie.set(DEVICE_ID, _deviceId);
    if (process.server) return;
    window.localStorage.setItem(DEVICE_ID, _deviceId);
};

export const removeToken = () => {
    Cookie.remove(SCHOOLLY_ACCESS_TOKEN);
    Cookie.remove(TOKEN_USER_SCHOOLLY);
    if (process.server) return;
    window.localStorage.removeItem(SCHOOLLY_ACCESS_TOKEN);
    window.localStorage.removeItem(TOKEN_USER_SCHOOLLY);
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
        .find(c => c.trim().startsWith(TOKEN_USER_SCHOOLLY));
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

/**
 * get device_id from cookie
 */
export const getDeviceIdFromCookie = req => {
    if (!req || !req.headers || !req.headers.cookie) return;
    const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith(DEVICE_ID));
    if (!jwtCookie) return null;
    const userCookie = jwtCookie.split("=")[1];
    return userCookie;
};

export const checkRequestAuthorize = _url => {
    const urls = _url.split("?");
    // console.log("urls", urls);

    // if url contain token=true => return true;
    if (_url.includes("token=true")) return true;

    // public api url
    if (_url.includes("/public")) return false;

    // public api
    if (UNAUTHORIZE_API.includes(urls[0])) {
        return false;
    }

    return true;
};
