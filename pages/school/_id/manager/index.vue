<template>
  <div class="container school-manager">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="1" />
      </div>
      <div class="col-md-9">
        <div class="box">
          <h5 class="color-primary">Tổng quan</h5>
          <hr class="mt-3 mb-4" />
          <div>
            <div class="box-primary">
              <app-avatar :src="schoolInfo.avatar" :size="150" />
              <div class="text">
                <h3>{{schoolInfo.name}}</h3>
                <p class="mt-3 mb-4 color-666">{{schoolInfo.description}}</p>
                <p class="color-999">
                  Mã trường:
                  <span class="h6">{{schoolInfo.code}}</span>
                </p>
              </div>
            </div>
            <div class="row text-center mt-4">
              <div class="col-3">
                <p class="h2 color-primary">{{ schoolInfo.teacher_number | toThousandFilter }}</p>
                <p>Tổng số giáo viên</p>
              </div>
              <div class="col-3">
                <p class="h2 color-primary">{{ schoolInfo.student_number | toThousandFilter }}</p>
                <p>Tổng số học sinh toàn trường</p>
              </div>
              <div class="col-3">
                <p class="h2 color-primary">{{ schoolInfo.lession_number | toThousandFilter }}</p>
                <p>Số bài giảng đã duyệt</p>
              </div>
              <div class="col-3">
                <p class="h2 color-primary">{{ schoolInfo.elearning_number | toThousandFilter }}</p>
                <p>Số khoá học đã duyệt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolManagerSide from "~/components/page/school/manager/SchoolManagerSide";
import IconCalendar from "~/assets/svg/icons/calendar.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconDollarAlt from "~/assets/svg/design-icons/dollar-alt.svg?inline";
import IconChartLine from "~/assets/svg/design-icons/chart-line.svg?inline";
import IconUserUser from "~/assets/svg/icons/user-user.svg?inline";

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

const elearningSchoolInfoStorePath = "elearning/school/school-info";

export default {
  name: "E-learning",

  components: {
    SchoolManagerSide,
    IconUserUser,
    IconBook,
    IconCalendar,
    IconDollarAlt,
    IconChartLine,
  },

  async asyncData ({ params }) {
    console.log('params: ', params);
  },

  async fetch({ params, query, store }) {
    const school_id = "e698a8ea-4e12-11ea-b77f-2e728ce88125";
    const data = { school_id };
    await store.dispatch(
        `${elearningSchoolInfoStorePath}/${actionTypes.SCHOOL_INFO.INFO}`,
        data
    );
  },

  data() {
    return {
      school: SCHOOL
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(elearningSchoolInfoStorePath, ["schoolInfo"]),
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/manager/_school-manager.scss";
</style>