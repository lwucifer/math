<template>
  <div class="container">
    <div>
      <div>
        <app-alert type="warning" class="mb-4" :show-icon=false>
          Phòng GDĐT huyện Mê Linh, Vĩnh Phúc hiện quản lý 100 trường mầm non, 1000 trường tiểu họchọc cơ sở và 1000 trường trung học cơ sở với tổng số giáo viên là 421. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac consectetur libero. Sed ac sem quis tortor fringilla venenatis. Aliquam id eros vel tellus hendrerit viverra.
        </app-alert>
      </div>
      <school-filter
        title="Danh sách các trường học trực thuộc quản lý của phòng GDĐT huyện Mê Linh, Vĩnh Phúc"
        :schoolTypes="schoolTypes"
        @handleChangeProvince="handleChangeProvince"
        @handleChangedDistrict="handleChangedDistrict"
        @handleChangedWard="handleChangedWard"
        :has-school-level=true
        :has-search=false
      >
      </school-filter>
      <!--Detail school types-->
      <div v-for="(category, index) in categories" :key="index">
        <school-list-box
          :category="category"
          @showAll="showAll"
          :schoolSearch="schoolSearch"
        >
        </school-list-box>
      </div>
    </div>
  </div>
</template>

<script>
  import SchoolFilter from "~/components/page/school/SchoolFilter";
  import SchoolListBox from "~/components/page/school/SchoolListBox";
  import { mapState } from "vuex";
  // Import faked data
  import {
    VILLAGES,
    DISTRICTS,
    PROVINCES,
    SCHOOL_TYPES,
    SCHOOL_TYPE_DETAILS
  } from "~/server/fakedata/school/test";
  import * as actionTypes from "~/utils/action-types";
  import { get } from "lodash";

  export default {
    name: "School",

    watchQuery: ["school_id"],

    components: {
      SchoolFilter,
      SchoolListBox
    },

    async fetch({ params, query, store }) {
      await store.dispatch(
          `elearning/school/school-search/${actionTypes.ELEARNING_SCHOOL_SEARCH.LIST}`
      );
      await store.dispatch(
          `elearning/public/public-category/${actionTypes.ELEARNING_PUBLIC_CATEGORY.LIST}`
      );
    },

    data() {
      return {
        isAuthenticated: true,
        schoolTypes: SCHOOL_TYPES,
        // list: SCHOOL_TYPE_DETAILS,
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
      })
    },

    watch: {
      province_id() {
        this.handleGetSchoolsByLocation();
      },
      district_id() {
        this.handleGetSchoolsByLocation();
      },
      ward_id() {
        this.handleGetSchoolsByLocation();
      }
    },

    methods: {
      showAll(id) {
        console.log("[Page School] show all a type of school: ", id);
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
      handleGetSchoolsByLocation() {
        let params = {};
        if (this.province_id) params.province_id = this.province_id;
        if (this.district_id) params.district_id = this.district_id;
        if (this.ward_id) params.ward_id = this.ward_id;
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
