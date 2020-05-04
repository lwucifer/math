<template>
  <div></div>
</template>

<script>
export default {
  name: "ZoomPaage",
  layout: "empty",

  head: {
    link: [
      { rel: "stylesheet", href: "/zoom/css/bootstrap.css" },
      { rel: "stylesheet", href: "/zoom/css/react-select.css" }
    ],
    script: [
      { src: "/zoom/react.production.min.js", defer: true },
      { src: "/zoom/react-dom.production.min.js", defer: true },
      { src: "/zoom/redux.min.js", defer: true },
      { src: "/zoom/redux-thunk.min.js", defer: true },
      { src: "/zoom/react.production.min.js", defer: true },
      { src: "/zoom/lodash.min.js", defer: true }
    ]
  },

  props: {
    nickname: String,
    meetingId: String
  },

  mounted() {
    const meetConfig = this.$MeetingCfg(this.meetingId, this.nickname);
    const ZoomMtg = this.$ZoomMtg;

    // Generate Signature function
    const signature = ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success: function(res) {
        console.log("success signature: " + res.result);
      }
    });

    // join function

    ZoomMtg.init({
      leaveUrl: "http://schoolly.vn",
      isSupportAV: true,
      success: () => {
        ZoomMtg.join({
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          apiKey: meetConfig.apiKey,
          userEmail: "email@gmail.com",
          passWord: meetConfig.passWord,
          success: function(res) {
            console.log("[ZoomMtg.join] join meeting success", res);
          },
          error: function(res) {
            console.log("[ZoomMtg.join] error", res);
          }
        });
      },

      error: function(res) {
        console.log("[ZoomMtg.init] err", res);
      }
    });
  }
};
</script>