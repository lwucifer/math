
export default function({ store, $axios, redirect }) {
  $axios.onRequest(config => {
    console.log("[onRequest]", config.url);

    // if (checkRequestAuthorize(config.url)) {
    //   config.headers.common["Authorization"] = `Bearer ${
    //     store.getters["login/accessToken"]
    //   }`;
    // }
  });

  $axios.onResponse(response => {
    // console.log("[onResponse]", response);
    // console.log('onResponse', response);
  });

  $axios.onRequestError(err => {
    console.log("[onRequestError]", err);
    // console.log("onRequestError", err);
  });

  $axios.onResponseError(error => {
    console.log("[onResponseError]", error);
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
