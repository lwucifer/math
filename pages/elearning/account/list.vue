<template>
  <div class="container elearning-account">
    <h1>Bài giảng và khóa học của tôi</h1>
    <div class="elearning-account__categories mb-3">
      <a class="link-gray active">Tất cả (5)</a>
      <a class="link-gray">Bài giảng (3)</a>
      <a class="link-gray">Khóa học (3)</a>
      <a class="link-gray">Yêu thích (3)</a>
      <a class="link-gray">Lưu trữ (0)</a>
    </div>
    <div class="row">
      <div
        class="custom-col-lg-5 col-md-3 col-sm-6 col-xs-12"
        v-for="(item,index) in  lessons"
        :key="index"
      >
        <ElearningItem :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search2.svg?inline";
import ElearningItem from "~/components/page/elearning/ElearningItem";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningItem,
    IconSearch,
    IconFilter
  },

  data() {
    return {
      isAuthenticated: true,
      lessons: [
        {
          id: 1,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          avatar: "https://picsum.photos/218/130",
          username: "Trần Văn A",
          status: 15,
          video: true
        },
        {
          id: 2,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          avatar: "https://picsum.photos/218/130",
          username: "Trần Văn A",
          status: 35,
          video: true
        },
        {
          id: 2,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          avatar: "https://picsum.photos/218/130",
          username: "Trần Văn A",
          status: 55
        },
        {
          id: 2,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          avatar: "https://picsum.photos/218/130",
          username: "Trần Văn A",
          status: 35
        },
        {
          id: 2,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          avatar: "https://picsum.photos/218/130",
          username: "Trần Văn A",
          status: 35
        },
        {
          id: 2,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          avatar: "https://picsum.photos/218/130",
          username: "Trần Văn A",
          status: 35
        }
      ],
      opt1: "",
      opts1: [
        { value: "", text: "Theo môn học" },
        { value: "1", text: "Theo tiến độ" },
        { value: "2", text: "Theo tên giáo viên" }
      ],
      opt2: "",
      opts2: [
        { value: "1", text: "Theo môn học" },
        { value: "", text: "Theo tiến độ" },
        { value: "2", text: "Theo tên giáo viên" }
      ],
      opt3: "",
      opts3: [
        { value: "2", text: "Theo môn học" },
        { value: "1", text: "Theo tiến độ" },
        { value: "", text: "Theo tên giáo viên" }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  watch: {},

  methods: {
    
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-account.scss";
</style>