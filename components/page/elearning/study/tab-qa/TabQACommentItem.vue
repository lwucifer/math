<template>
  <div class="tab-qa-comment-item" :class="classes">
    <app-avatar
      :size="level === 1 ? 40 : 30"
      :src="get(question, 'creator.avatar.low', '')"
    />

    <div class="tab-qa-comment-item__right">
      <div class="tab-qa-comment-item__top">
        <div class="tab-qa-comment-item__top-left">
          <h6 class="tab-qa-comment-item__name">
            {{ get(question, "creator.name", "") }}
          </h6>
          <app-stars
            v-if="showStars"
            class="tab-qa-comment-item__rate ml-2"
            :stars="stars"
          />
        </div>

        <span class="tab-qa-comment-item__time">
          <IconAccessTime class="icon mr-2" />{{
            get(question, "timestamp", "") | moment("hh:mm DD/MM/YYYY")
          }}
        </span>
      </div>

      <div class="tab-qa-comment-item__title" v-if="showTitle">{{ title }}</div>

      <div class="tab-qa-comment-item__content">
        <p>
          {{ get(question, "content", "") }}
        </p>
        <!-- <img
          v-if="image"
          class="tab-qa-comment-item__img d-block"
          src="~assets/images/tmp/study-comment-demo.jpg"
          alt=""
        /> -->
      </div>
      <div class="tab-qa-comment-item__actions">
        <button
          class="tab-qa-comment-item__like"
          :class="{ active: get(question, 'liked', false) }"
        >
          <IconThumbUp class="icon" />&nbsp;{{
            numeral(get(question, "likes", 0)).format()
          }}
        </button>
        <button
          class="tab-qa-comment-item__reply"
          @click="showReply = !showReply"
        >
          Phản hồi
        </button>
      </div>

      <slot v-bind="{ showReply }" />
    </div>
  </div>
</template>

<script>
import IconThumbUp from "~/assets/svg/v2-icons/thumb_up_24px.svg?inline";
import IconAccessTime from "~/assets/svg/v2-icons/access_time_24px.svg?inline";
import { get } from "lodash";
import moment from "moment";
import numeral from "numeral";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

export default {
  components: {
    IconThumbUp,
    IconAccessTime,
  },

  data() {
    return {
      showReply: false,
    };
  },

  props: {
    level: {
      type: Number,
      default: 1,
      validator: (value) => [1, 2].includes(value),
    },
    name: String,
    avatar: String,
    content: String,
    time: String,
    stars: Number,
    showStars: Boolean,
    title: String,
    showTitle: Boolean,
    image: String,
    liked: Boolean,
    question: {},
  },

  computed: {
    classes() {
      return {
        "tab-qa-comment-item--level-2": this.level === 2,
      };
    },
  },

  methods: {
    get,
    moment,
    numeral,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_tab-qa-comment-item.scss";
</style>
