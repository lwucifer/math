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
          :v-model="filter.level"
          :options="[{ name: 'Cấp 1', value: 0 }, { name: 'Cấp 2', value: 1 }, { name: 'Cấp 3', value: 2 }]"
          label="name"
          :reduce="value => value"
          placeholder="Theo cấp học"
          searchable
          clearable
          @input="handleChangedLevel"
        >
        </app-vue-select>
      </div>

      <div class="school-filter__form--right">
        <div v-if="hasSearch" class="school-filter__form__item school-filter__form__item--search">
          <app-search
            class=""
            :placeholder="'Nhập để tìm kiếm...'"
            :counter="11"
            v-model="filter.query"
            :size="'sm'"
            @input="handleChangeSearch"
          >
          </app-search>
        </div>
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
    schoolTypes: {
      type: Array,
      required: true,
      default: () => []
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    hasSchoolLevel: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      filter: {
        province: null,
        district: null,
        village: null,
        schoolType: null,
        query: null
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
    handleChangeSearch(val) {
      this.$emit('handleChangeSearch', val)
    },
    handleChangedLevel(level) {
      this.$emit("handleChangedLevel", level);
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
