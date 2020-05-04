<template>
  <div class="container">
    <h1>
      Tìm kiếm từ khóa “Tiếng anh” có
      <span class="color-primary">50 kết quả</span>
    </h1>
    <div class="elearning-search__toolbar mb-5 mt-4">
      <app-button rounded size="sm" class="mr-4">
        <IconFilter class="mr-2" />Lọc kết quả
      </app-button>
      <label>
        <input type="checkbox" v-model="free" />
        Miễn phí
      </label>
      <!-- <app-select v-model="opt1" :options="opts1" /> -->
      <CourseSelectSubject
        @handleChangeSubject="handleChangeSubject"
        :defaultValue="payload.subject"
      />
      <app-select v-model="opt2" :options="opts2" />
      <app-select v-model="opt3" :options="opts3" />
      <app-select v-model="opt4" :options="opts4" />
      <div class="ml-auto">
        <strong>Sắp xếp</strong>
        <app-select v-model="opt5" :options="opts5" />
      </div>
    </div>

    <div class="row">
      <div
        class="custom-col-lg-5 col-3 col-sm-6 col-xs-12"
        v-for="(item, index) in lessons"
        :key="index"
      >
        <ElearningItem2 :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import ElearningItem2 from "~/components/page/elearning/ElearningItem2";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import Search from "~/services/elearning/public/Search";
import { useEffect } from "~/utils/common";
import { get } from "lodash";
import CourseSelectSubject from "~/components/page/course/create/info/CourseSelectSubject";

export default {
  name: "E-learning",

  components: {
    ElearningItem2,
    IconFilter,
    CourseSelectSubject,
  },

  async created() {
    useEffect(this, this.getLessons.bind(this), ["payload"]);
  },

  data() {
    return {
      isAuthenticated: true,
      free: false,
      opt1: "",
      opts1: [
        { value: "", text: "Theo môn học" },
        { value: "1", text: "Theo tiến độ" },
        { value: "2", text: "Theo tên giáo viên" },
      ],
      opt2: "",
      opts2: [
        { value: "1", text: "Theo môn học" },
        { value: "", text: "Theo tiến độ" },
        { value: "2", text: "Theo tên giáo viên" },
      ],
      opt3: "",
      opts3: [
        { value: "2", text: "Theo môn học" },
        { value: "1", text: "Theo tiến độ" },
        { value: "", text: "Theo tên giáo viên" },
      ],
      opt4: "",
      opts4: [
        { value: "2", text: "Bài giảng" },
        { value: "1", text: "Khóa học" },
        { value: "", text: "Tất cả" },
      ],
      opt5: "1",
      opts5: [
        { value: "2", text: "Rẻ nhất" },
        { value: "1", text: "Mới nhất" },
      ],
      lessons: [],
      active_el: 0,
      payload: {
        subject: "",
      },
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
  },

  watch: {},

  methods: {
    async getLessons() {
      const res = await new Search(this.$axios)[actionTypes.BASE.ADD](
        this.payload
      );
      this.lessons = get(res, "data.content", []);
    },

    handleChangeSubject(subject) {
      console.log(subject);
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-search.scss";
</style>
