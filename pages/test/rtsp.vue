<template>
  <div class="player-container">
    <h2>RTSP Streaming video</h2>
    <video id="test_video" controls autoplay>
      <source src="rtsp://222.254.35.170:8900/live" />
    </video>
  </div>
</template>

<script>
// trungnqkey
// rtmp://localhost:1935/live
export default {
  naem: "Streaming",

  head() {
    return {
      script: [
        {
          src: "/vendors/streamedian.min.js",
          type: "text/javascript",
          defer: true
        }
      ]
    };
  },

  data() {
    return {
      myPlayer: null,
      mute: false
    };
  },

  mounted() {
    console.log("[mounted]");
  },

  methods: {}
};
</script>

<style>
</style>