import { checkRequestAuthorize, removeToken } from "~/utils/auth";
import { AUTH as ACTION_AUTH } from "~/utils/action-types";
import { AUTH as MUTATION_AUTH } from "~/utils/mutation-types";

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
    subscribers = subscribers.filter(callback => callback(access_token));
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

export default function({ store, $axios, redirect }) {
    $axios.onRequest(config => {
        console.log("[onRequest]", config.url);

        if (checkRequestAuthorize(config.url)) {
            if (!store.getters["auth/token"]) return;
            config.headers.common["Authorization"] = `Bearer ${store.state.auth.token.access_token}`;

            // config.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0LCJwaG9uZV9udW1iZXIiOiIwMzU2MjU3MzI1In0sImlhdCI6MTU3NTUzNDcxOSwiZXhwIjoxODM0NzM0NzE5fQ.w-oB2pH2aPiyzTXpSQumuShy5xQQEGfURDp1-KjzfkM`;
        } else {
            config.headers.common = {};
        }
    });

    $axios.onResponse(response => {
        // console.log("[onResponse]", response);
        const originalRequest = response.config;
        const dataCode = response.data.code;
        console.log("dataCode huydv", dataCode);
        if (dataCode == "SCLCOM_0002") {
            // expire token => renew
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;
                const refreshToken = store.getters["auth/refreshToken"];
                store
                    .dispatch(`auth/${ACTION_AUTH.REFRESH_TOKEN}`, {
                        refresh_token: refreshToken
                    })
                    .then(result => {
                        isAlreadyFetchingAccessToken = false;
                        if (result.success == true) {
                            onAccessTokenFetched(result.data.access_token);
                        } else {
                            // remove token and redirect to login
                            store.commit(`auth/${MUTATION_AUTH.REMOVE_TOKEN}`);

                            // console.log("[RENEW_TOKEN 1] /login")
                            redirect(`/login`);
                        }
                    })
                    .catch(err => {
                        store.commit(`login/${MUTATION_AUTH.REMOVE_TOKEN}`);
                        // console.log("[RENEW_TOKEN 2] /login")
                        redirect(`/login`);
                    });
            }

            // resolve origin request
            const retryOriginalRequest = new Promise(resolve => {
                addSubscriber(access_token => {
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    resolve($axios(originalRequest));
                });
            });
            return retryOriginalRequest;
        }
    });

    $axios.onRequestError(err => {
        console.log("[onRequestError]");
        // console.log("onRequestError", err);
    });

    $axios.onResponseError(error => {
        console.log("[onResponseError]", error);
        const code = parseInt(error.response && error.response.status);
        if (code === 401) {
            removeToken();
            redirect("/auth/signin");
        }
        console.log("[onResponseError]", error.response);
    });

    $axios.onError(error => {
        console.log("[onError]", error);
        // const code = parseInt(error.response && error.response.status);
        // if (code === 400) {
        //   redirect("/400");
        // }
    });
}