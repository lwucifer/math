<template>
  <div class="school-list-box">
    <div class="school-list-box__title">
      <h4>
        <span class="school-list-box__title__name">{{ category.name }}</span>
        <span class="school-list-box__title__description">
          (
          {{ schoolNum }} trường học - {{ teacherNum }} giáo viên -
          {{ studentNum }} học sinh )
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
          <school-item :school="school" />
        </div>
      </div>
    </div>
    <div class="school-list-box__footer">
      <div class="text-center">
        <app-button square class="mt-3 school-list-box__footer__submit-btn" @click="showAll">
          <span class>Xem tất cả</span>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolItem from "~/components/page/school/SchoolItem";
import { get, toNumber } from "lodash";
import { SCHOOL_TYPE } from "~/server/fakedata/school/test";

export default {
  components: {
    SchoolItem
  },

  props: {
    category: {
      type: Object,
      required: true
    },
    schoolSearch: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    schools() {
      const type = get(this, "category.type", "");
      const schoolList = get(this, `schoolSearch.data.content`, []);
      console.log("[schoolList]", schoolList, type);
      return schoolList.filter(sc => sc.type == type) || [];
    },

    schoolNum() {
      return this.schools.length || 0;
    },

    studentNum() {
      return this.schools.reduce((a, b) => {
        return a + b.student_number;
      }, 0);
    },

    teacherNum() {
      return this.schools.reduce((a, b) => {
        return a + b.teacher_number;
      }, 0);
    }
  },

  methods: {
    showAll() {
      this.$emit("showAll", this.id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-list-box.scss";
</style>
