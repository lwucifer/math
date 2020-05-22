<template>
  <section class="stream-frame">
    <div
      v-show="!loadingExercise"
      class="video-player-box vjs-big-play-centered"
      :playsinline="playsinline"
      @play="onPlayerPlay($event)"
      @error="onPlayerError($event)"
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
    <div
      class="text-center w-100 pt-md"
      style="min-height: 42.6rem;"
      v-show="loadingExercise"
    >
      <app-spin />
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  layout: "empty",

  head: {
    link: [{ rel: "stylesheet", href: "/streaming/video-js.css" }]
  },

  props: {
    url: String,
    thumbnail: {
      type: String
    }
  },

  updated() {
    console.log(this.url);
  },

  watch: {
    url: {
      handler: function() {
        console.log(this.url);
        this.playerOptions.sources[0].src = this.url;
        this.$forceUpdate();
      },
      deep: true
    },
    playerOptions: {
      handler: function() {
        console.log(this.playerOptions);
      },
      deep: true
    }
  },

  data() {
    return {
      // component options
      playsinline: true,

      // api get streaming
      // {{API_ENDPOINT_CORE}}/streaming/video/elearning/79408a5d-12d7-4498-a2b3-faf4b9a9d1bd/lesson/1699ee83-60ec-488a-814f-d9cfbce252b4/vod

      // videojs options
      playerOptions: {
        muted: false,
        fluid: true,
        // responsive: true,
        language: "vi",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            // type: "application/x-mpegURL",
            src: this.url
          }
        ],
        poster: this.thumbnail,
        preload: "metadata",
        liveui: true,
        playbackRates: [0.5, 1, 1.5, 2],
        height: 422
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.myVideoPlayer);
    console.log("playerOptions", this.playerOptions);
    this.playerOptions.sources[0].src = this.url;
    this.$forceUpdate();
  },
  computed: {
    ...mapState("event", ["loadingExercise"])
  },

  methods: {
    ...mapMutations("event", ["setExerciseLoading"]),

    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerError(player) {
      console.log("player error!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log("player ended!", player);
    },
    onPlayerLoadeddata(player) {
      console.log("player Loadeddata!", player);
    },
    onPlayerWaiting(player) {
      console.log("player Waiting!", player);
    },
    onPlayerPlaying(player) {
      console.log("player Playing!", player);
    },
    onPlayerTimeupdate(player) {
      console.log("player Timeupdate!", player.currentTime());
    },
    onPlayerCanplay(player) {
      console.log("player Canplay!", player);
      this.setExerciseLoading(false); // turnoff loading
    },
    onPlayerCanplaythrough(player) {
      console.log("player Canplaythrough!", player);
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

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-stream.scss";
</style>
