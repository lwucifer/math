<template>
  <div class="school-filter">
    <div class="school-filter__title" v-if="title.length || link">
      <h3 class="aside-box__title" v-if="title.length">{{ title }}</h3>
      <n-link v-if="link" :to="link || ''" class="aside-box__link">{{
        linkText
      }}</n-link>
    </div>
    <div class="school-filter__form">
      <div class="school-filter__form__item">
        <app-button
          color="primary"
          @click="submit"
          class="school-filter__btn-submit"
        >
          <IconFilter />
          <span>Lọc kết quả</span>
        </app-button>
      </div>

      <app-select-location
        @handleChangeProvince="handleChangeProvince"
        @handleChangedDistrict="handleChangedDistrict"
        @handleChangedWard="handleChangedWard"
      />

      <div class="school-filter__form__item">
        <app-vue-select
          class="app-vue-select"
          v-model="filter.schoolType"
          :options="schoolTypes"
          label="text"
          placeholder="Theo cấp học"
          searchable
          clearable
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
        >
        </app-vue-select>
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";

export default {
  components: {
    IconFilter
  },
  props: {
    title: {
      type: String,
      required: true,
      default: "Danh sách các trường học"
    },
    link: {
      type: [String, Object]
    },
    linkText: {
      type: String
    },
    // provinces: {
    //   type: Array,
    //   required: true,
    //   default: () => []
    // },
    // districts: {
    //   type: Array,
    //   required: true,
    //   default: () => []
    // },
    // villages: {
    //   type: Array,
    //   required: true,
    //   default: () => []
    // },
    schoolTypes: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      filter: {
        province: null,
        district: null,
        village: null,
        schoolType: null
      }
    };
  },
  methods: {
    submit() {
      console.log("[Component] SchoolFilter: submitted");
    },
    handleChangeProvince(province) {
      this.$emit("handleChangeProvince", province);
    },
    handleChangedDistrict(district) {
      this.$emit("handleChangedDistrict", district);
    },
    handleChangedWard(ward) {
      this.$emit("handleChangedWard", ward);
    },
    handleChangedInput(val) {
      // if (val !== null) {
      // } else {
      // }
      // console.log("[Component] SchoolFilter: changing input...", val);
    },
    handleFocusSearchInput() {
      // console.log("[Component] SchoolFilter: focus searching ");
    },
    handleBlurSearchInput() {
      // console.log("[Component] SchoolFilter: blur searching ");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-filter.scss";
</style>
