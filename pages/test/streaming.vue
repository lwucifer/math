<template>
  <div class="player-container">
    <h2>Streaming video</h2>
    <div id="playerElement" style="width:100%; height:0; padding:0 0 56.25% 0"></div>
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
          src: "https://player.wowza.com/player/latest/wowzaplayer.min.js",
          type: "text/javascript",
          defer: true
        }
      ]
    };
  },

  data() {
    return {
      myPlayer: null,
      mute: false,
    };
  },

  mounted() {
    console.log("[mounted]");
    this.myPlayer = WowzaPlayer.create("playerElement", {
      license: "PLAY2-aRxvR-K3uah-PUcUm-vyQnf-WVuBp",
      sourceURL: "http://10.56.77.116:1935/live/trungnqkey/playlist.m3u8",
      autoPlay: true,
      debugLevel: 'DEBUG',
      mute: this.mute,
      title: "trungnq showoff"
    });

    setTimeout(() => {
        console.log("Timeout fire...")
      // this.myPlayer.destroy();
    //   this.mute = true;
    }, 10000);

    this.myPlayer.onSeek(event => {
        console.log("[onSeek]", event);
    });

    this.myPlayer.onVolume(event => {
        console.log("[onVolume]", event);
    });

    this.myPlayer.onMetadata(event => {
        console.log("[onMetadata]", event);
    })

  }
};
</script>

<style>
</style>