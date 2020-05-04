<template>
  <section class="container">
    <div
      class="video-player-box"
      :playsinline="playsinline"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
      v-video-player:myVideoPlayer="playerOptions"
    ></div>
  </section>
</template>

<script>
export default {
  layout: 'empty',

  head: {
    link: [
      { rel: "stylesheet", href: '/streaming/video-js.css' },
    ],
  },

  data() {
    return {
      // component options
      playsinline: true,

      // api get streaming
      // {{API_ENDPOINT_CORE}}/streaming/video/elearning/79408a5d-12d7-4498-a2b3-faf4b9a9d1bd/lesson/1699ee83-60ec-488a-814f-d9cfbce252b4/vod

      // videojs options
      playerOptions: {
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "application/x-mpegURL",
            src:
              "http://202.134.19.25:1935/vod_dev/_definst_/mp4:https/20200416164926546_f694b2127dfebed665c38e821612767054202ee5508452c52d2e8cff3bc770f9.mp4/playlist.m3u8?token=6e0ea6b6-3dc0-4135-b884-6b3029601b6d"
          }
        ]
        // poster: "/static/images/author.jpg",
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.myVideoPlayer);
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player)
    },

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },

    // player is ready
    playerReadied(player) {
      console.log("example 01: the player is readied", player);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;

  .video-player-box {
    min-height: 200px;
  }
}
</style>
