<template>
  <div class="school-list-box">
    <div class="school-list-box__title">
      <h4>
        <span class="school-list-box__title__name">{{ name }}</span>
        <span class="school-list-box__title__description">
          (
          {{ schoolNum }} trường học - {{ teacherNum }} giáo viên -
          {{ studentNum }} học sinh
        </span>
      </h4>
    </div>
    <!--List schools-->
    <div class="school-list-box__content">
      <div class="row row--school-list">
        <div
          class="custom-col-lg-5 col-3 col-sm-6 col-xs-12"
          v-for="(school, index) in schools"
          :key="index"
        >
          <school-item :item="school" />
        </div>
      </div>
    </div>
    <div class="school-list-box__footer">
      <div class="text-center">
        <app-button
          square
          class="mt-3 school-list-box__footer__submit-btn"
          @click="showAll"
        >
          <span class="">Xem tất cả</span>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolItem from "~/components/page/school/SchoolItem";
import { get } from "lodash";

export default {
  components: {
    SchoolItem
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    // name: {
    //   type: String,
    //   required: true
    // },
    // schoolNum: {
    //   type: Number,
    //   required: true
    // },
    // teacherNum: {
    //   type: Number,
    //   required: true
    // },
    // studentNum: {
    //   type: Number,
    //   required: true
    // },
    // items: {
    //   type: Array,
    //   required: true,
    //   default: () => []
    // },
    elearningSchoolSummary: {
      type: Object,
      default: () => {}
    }
  },

  created() {
    console.log(this.name);
  },

  computed: {
    schoolNum() {
      if (this.item.id === 1)
        return get(this, "elearningSchoolSummary.data.total_nursery_school", 0);
      if (this.item.id === 2)
        return get(this, "elearningSchoolSummary.data.total_primary_school", 0);
      if (this.item.id === 3)
        return get(this, "elearningSchoolSummary.data.total_junior_school", 0);
      if (this.item.id === 4)
        return get(this, "elearningSchoolSummary.data.total_high_school", 0);
      return 0;
    },
    schools() {
      if (this.item.id === 1)
        return get(this, "elearningSchoolSummary.data.nursery_schools", []);
      if (this.item.id === 2)
        return get(this, "elearningSchoolSummary.data.primary_schools", []);
      if (this.item.id === 3)
        return get(this, "elearningSchoolSummary.data.junior_schools", []);
      if (this.item.id === 4)
        return get(this, "elearningSchoolSummary.data.high_schools", []);
      return [];
    }
  },

  methods: {
    showAll() {
      console.log("[Component] SchoolListBox: Click `Xem tat ca`");
      this.$emit("showAll", this.id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-list-box.scss";
</style>
