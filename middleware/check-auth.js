import {
    getAccessTokenFromCookie,
    getAccessToken,
    getTokenFromCookie,
    getToken
} from "../utils/auth";
import { AUTH } from "../utils/mutation-types";

export default async function({ store, req, redirect, route }) {
    // If nuxt generate, pass this middleware
    // if (process.server && !req) return
    debugger;
    const loggedToken = process.server ? getTokenFromCookie(req) : getToken();
    const loggedAccessToken = process.server ?
        getAccessTokenFromCookie(req) :
        getAccessToken();

    if (loggedToken) {
        store.commit(`auth/${AUTH.SET_TOKEN}`, loggedToken);
    } else {
        // logout/invalid token case
        store.commit(`auth/${AUTH.REMOVE_TOKEN}`);
    }
    if (loggedAccessToken) {
        store.commit(`auth/${AUTH.SET_ACCESS_TOKEN}`, loggedAccessToken);
    }
}