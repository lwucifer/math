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
            config.headers.common["Authorization"] = `Bearer ${
        config.url.includes("/user/public/renew")
          ? store.state.auth.token.token
          : store.state.auth.access_token
      }`;

            // config.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0LCJwaG9uZV9udW1iZXIiOiIwMzU2MjU3MzI1In0sImlhdCI6MTU3NTUzNDcxOSwiZXhwIjoxODM0NzM0NzE5fQ.w-oB2pH2aPiyzTXpSQumuShy5xQQEGfURDp1-KjzfkM`;
        } else {
            config.headers.common = {};
        }
    });

    $axios.onResponse(
        response => {
            console.log("[onResponse]");
        },
        err => {
            return Promise.reject(err.response);
        }
    );

    $axios.onRequestError(err => {
        console.log("[onRequestError]");
        // console.log("onRequestError", err);
    });

    $axios.onResponseError(error => {
        // console.log("[onResponseError]", error);
        // const code = parseInt(error.response && error.response.status);
        // if (code === 401) {
        //     removeToken();
        //     redirect("/auth/signin");
        // }
        console.log("[onResponseError]");
        const code = parseInt(error.response && error.response.status);
        const originalRequest = error.response && error.response.config;
        if (code === 401) {
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;

                store.dispatch(`auth/${ACTION_AUTH.REFRESH_TOKEN}`).then(result => {
                    isAlreadyFetchingAccessToken = false;
                    if (result.success == true) {
                        onAccessTokenFetched(result.data.access_token);
                    } else {
                        // remove token and redirect to login
                        store.commit(`auth/${MUTATION_AUTH.REMOVE_TOKEN}`);
                        redirect(`/auth/signin`);
                    }
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
        } else if (code === 422 || code === 403 || code === 415) {
            store.commit(`auth/${MUTATION_AUTH.REMOVE_TOKEN}`);
            redirect(`/auth/signin`);
        } else {
            redirect("/404");
        }
    });

    $axios.onError(error => {
        console.log("[onError]", error);
        // const code = parseInt(error.response && error.response.status);
        // if (code === 400) {
        //   redirect("/400");
        // }
    });
}