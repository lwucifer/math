import { checkRequestAuthorize } from "~/utils/auth";
export default function({ store, $axios, redirect }) {
    $axios.onRequest(config => {
        console.log("[onRequest]", config.url);

        if (checkRequestAuthorize(config.url)) {
            // if (!store.getters["auth/token"]) return;
            config.headers.common[
                "Authorization"
            ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0LCJwaG9uZV9udW1iZXIiOiIwMzU2MjU3MzI1In0sImlhdCI6MTU3NTUzNDcxOSwiZXhwIjoxODM0NzM0NzE5fQ.w-oB2pH2aPiyzTXpSQumuShy5xQQEGfURDp1-KjzfkM`;
            // Bearer ${
            //   config.url.includes("/refresh_token")
            //     ? store.state.auth.token.token
            //     : store.state.auth.access_token
            // }
        } else {
            config.headers.common = {};
        }
    });

    $axios.onResponse(response => {
        // console.log("[onResponse]", response);
        // console.log('onResponse', response);
    });

    $axios.onRequestError(err => {
        // console.log("[onRequestError]", err);
        // console.log("onRequestError", err);
    });

    $axios.onResponseError(error => {
        // console.log("[onResponseError]", error);
        // const code = parseInt(error.response && error.response.status);
        // if (code === 401) {
        //   removeToken();
        //   redirect("/login");
        // }
    });

    $axios.onError(error => {
        console.log("[onError]", error);
        // const code = parseInt(error.response && error.response.status);
        // if (code === 400) {
        //   redirect("/400");
        // }
    });
}