<template>
  <div class="school-list-box">
    <div class="school-list-box__title">
      <h4>
        <span class="school-list-box__title__name">{{ item.name }}</span>
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
import { get, toNumber } from "lodash";

export default {
  components: {
    SchoolItem
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    elearningSchoolSearch: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    schoolNum() {
      const schoolNumKey = get(this, "item.schoolNumKey", "");
      return get(this, `elearningSchoolSearch.data.${schoolNumKey}`, 0);
    },
    studentNum() {
      const studentNumKey = get(this, "item.studentNumKey", "");
      return get(this, `elearningSchoolSearch.data.${studentNumKey}`, 0);
    },
    teacherNum() {
      const teacherNumKey = get(this, "item.teacherNumKey", "");
      return get(this, `elearningSchoolSearch.data.${teacherNumKey}`, 0);
    },
    schools() {
      const schoolsKey = get(this, "item.schoolsKey", "");
      return get(this, `elearningSchoolSearch.data.${schoolsKey}`, []);
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
