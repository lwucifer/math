<template>
  <div class="container">
    <div>
      <school-filter
        class="mb-3"
        title="Danh sách trường học"
        :resultSpan="resultSummary"
        :schoolTypes="categoryOpts"
        :hasSort="true"
        :hasLocation="true"
        :hasSchoolLevel="true"
        :hasSearch="false"
        :hasSearchTitle="true"
        :selectedType="selectedType"
        @handleChangeProvince="handleChangeProvince"
        @handleChangedLevel="handleChangedLevel"
        @handleChangedDistrict="handleChangedDistrict"
        @handleChangedWard="handleChangedWard"
        @handleChangeSearch="handleChangeSearch"
      ></school-filter>
      <!--Detail school types-->
      <SchoolListBox :category="selectedCategory" @showAll="showAll" :schoolSearch="schoolSearch"></SchoolListBox>
    </div>
  </div>
</template>

<script>
import SchoolFilter from "~/components/page/school/SchoolFilter";
import SchoolListBox from "~/components/page/school/SchoolListBox";
import SchoolSlider from "~/components/page/school/SchoolListSlider";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect, addAllOptionSelect } from "~/utils/common";

export default {
  name: "School",

  watchQuery: ["school_id"],

  components: {
    SchoolFilter,
    SchoolListBox,
    SchoolSlider
  },

  async asyncData({ store, query }) {
    const { keyword, type } = query; // get keyword, type from url

    return {
      keyword,
      type
    };
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning/public/public-category/${actionTypes.ELEARNING_PUBLIC_CATEGORY.LIST}`
    );
  },

  data() {
    return {
      isAuthenticated: true,
      province_id: "",
      district_id: "",
      ward_id: ""
    };
  },

  computed: {
    ...mapState("elearning/school/school-search", {
      schoolSearch: "elearningSchoolSearch"
    }),
    ...mapState("elearning/public/public-category", {
      categories: "categories"
    }),

    schools() {
      return get(this, `schoolSearch.data.content`, []);
    },

    resultSummary() {
      const schoolNum = this.schools.length || 0;
      const studentNum = this.schools.reduce((a, b) => {
        return a + b.student_number;
      }, 0);
      const teacherNum = this.schools.reduce((a, b) => {
        return a + b.teacher_number;
      }, 0);
      return `${schoolNum} trường - ${teacherNum} giáo viên - ${studentNum} học sinh`;
    },

    categoryOpts() {
      return addAllOptionSelect(this.categories);
    },

    selectedCategory() {
      if (this.type) return this.categories.find(c => c.type == this.type);
      return {};
    },

    selectedType() {
      return this.type;
    }
  },

  created() {
    useEffect(this, this.handleGetSchoolsByLocation.bind(this), [
      "type",
      "province_id",
      "district_id",
      "ward_id",
      "keyword"
    ]);
  },

  methods: {
    showAll(id) {
      console.log("[Page School] show all a type of school: ", id);
    },
    handleChangedLevel(level) {
      console.log("[handleChangedLevel] level", level);
      this.type = get(level, "type", "");
    },
    handleChangedWard(ward) {
      this.ward_id = get(ward, "id", "");
    },
    handleChangedDistrict(district) {
      this.district_id = get(district, "id", "");
    },
    handleChangeProvince(province) {
      this.province_id = get(province, "id", "");
    },
    handleChangeSearch(keyword) {
      console.log("[handleChangeSearch]", keyword);
      this.keyword = keyword;
    },
    handleGetSchoolsByLocation() {
      let params = {};
      if (this.province_id) params.province_id = this.province_id;
      if (this.district_id) params.district_id = this.district_id;
      if (this.ward_id) params.ward_id = this.ward_id;
      if (this.keyword) params.keyword = this.keyword;
      if (this.type) params.type = this.type;
      // params.province_id = this.province_id
      // params.district_id = this.district_id
      // params.ward_id = this.ward_id
      // params.keyword = this.keyword
      // params.type = this.type

      const options = { params };
      this.$store.dispatch(
        `elearning/school/school-search/${actionTypes.ELEARNING_SCHOOL_SEARCH.LIST}`,
        options
      );
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school.scss";
</style>
