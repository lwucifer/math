<template>
  <div class="account-photos">
    <div class="account-photos__title">
      <h3>Ảnh</h3>
      <app-button square>+ Thêm ảnh / Video</app-button>
    </div>
    <ul class="account-photos__nav">
      <li>
        <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Ảnh của bạn</a>
      </li>
      <li>
        <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Ảnh được tags</a>
      </li>
      <li>
        <a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Video</a>
      </li>
    </ul>
    <div class="account-photos__list">
      <!-- Content my photo -->
      <div class="row photos" v-if="tab == 1">
        <div
          class="col-md-3 col-sm-6 col-xs-12 photo"
          v-for="(item, index) in filterPhotoList"
          :key="index"
        >
          <img :src="item.link && item.link.low ? item.link.low : ''" alt />
        </div>
      </div>

      <!-- Content photo tags-->
      <div class="row photos" v-if="tab == 2">
        <div
          class="col-md-3 col-sm-6 col-xs-12 photo"
          v-for="(item, index) in filterTagPhotoList"
          :key="index"
        >
          <img :src="item.link && item.link.low ? item.link.low : ''" alt />
        </div>
      </div>

      <!-- Content video-->
      <div class="row" v-if="tab == 3">
        <div class="col-md-6 col-sm-12 mb-4" v-for="(item, index) in videos" :key="index">
          <div class="video-item">
            <img :src="item.src" alt />
            <span class="time">{{item.time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},

  data() {
    return {
      tab: 1,
      photos: [
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" },
        { src: "https://picsum.photos/179/179" }
      ],
      videos: [
        { src: "https://picsum.photos/350/179", time: "0:29" },
        { src: "https://picsum.photos/350/179", time: "0:29" },
        { src: "https://picsum.photos/350/179", time: "0:29" },
        { src: "https://picsum.photos/350/179", time: "0:29" },
        { src: "https://picsum.photos/350/179", time: "0:29" }
      ]
    };
  },

  computed: {
    ...mapState("account", ["postPhotoList", "postTagPhotoList"]),
    filterPhotoList() {
      return this.postPhotoList && this.postPhotoList.listPhotos
        ? this.postPhotoList.listPhotos
        : [];
    },
    filterTagPhotoList() {
      return this.postTagPhotoList && this.postTagPhotoList.listPhotos
        ? this.postTagPhotoList.listPhotos
        : [];
    }
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-photos.scss";
</style>