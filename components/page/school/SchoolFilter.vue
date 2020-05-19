<template>
  <div class="school-filter">
    <div class="school-filter__title" v-if="title.length || link">
      <h3 class="aside-box__title" v-if="title.length">
        {{ title }}
        <span v-if="!!resultSpan">{{resultSpan}}</span>
      </h3>
      <n-link v-if="link" :to="link || ''" class="aside-box__link">
        {{
        linkText
        }}
      </n-link>

      <div class="school-filter__form__item school-filter__form__item--search__inline">
        <app-search
          v-if="hasSearchTitle"
          style="width: 100%"
          :placeholder="'Nhập để tìm kiếm...'"
          v-model="filter.query"
          :size="'sm'"
          @input="handleChangeSearch"
        ></app-search>
      </div>
    </div>
    <div class="school-filter__form">
      <div v-if="hasSearch" class="school-filter__form__item school-filter__form__item--search">
        <app-search
          style="width: 100%"
          class="mb-0"
          :placeholder="'Nhập để tìm kiếm...'"
          v-model="filter.query"
          :size="'sm'"
          @submit="handleSubmitSearch"
          @keyup.enter.native="handleEnterSearch"
        ></app-search>
      </div>

      <div class="filter-form__item mr-2" v-if="hasFilterBtn" @click="isShowFilter = !isShowFilter">
        <app-button
          :color="isShowFilter ? 'primary' : 'default'"
          square
          :size="'sm'"
        >
          <IconHamberger class="icon mr-2" />
          <span>Lọc kết quả</span>
        </app-button>
      </div>

      <div class="school-filter__form__item" v-if="hasSchoolLevel && isShowFilter">
        <app-vue-select
          class="app-vue-select"
          :v-model="filter.level"
          :options="schoolTypes"
          label="name"
          placeholder="Cấp học"
          :reduce="value => value"
          searchable
          :clearable="false"
          @input="handleChangedLevel"
        ></app-vue-select>
      </div>

      <app-select-location
        @handleChangeProvince="handleChangeProvince"
        @handleChangedDistrict="handleChangedDistrict"
        @handleChangedWard="handleChangedWard"
        v-if="hasLocation && isShowFilter"
      />

      <div class="school-filter__form__item ml-auto" v-if="hasSort">
        <label class="school-filter__form__item__title pl-3" for>Sắp xếp theo</label>
        <app-vue-select
          style="width: 21rem"
          class="app-vue-select"
          :v-model="filter.order"
          :options="[ { name: 'Có nhiều học sinh nhất', value: 'MOST_STUDENT' }, { name: 'Có nhiều giáo viên nhất', value: 'MOST_TEACHER ' } ]"
          label="name"
          placeholder="Sắp xếp theo"
          :reduce="value => value"
          searchable
          clearable
          @input="handleChangedOrder"
        ></app-vue-select>
      </div>
    </div>
  </div>
</template>

<script>
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import {get} from 'lodash';


export default {
  components: {
    IconHamberger
  },
  props: {
    title: {
      type: String,
      required: true,
      default: "Danh sách"
    },
    resultSpan: {
      type: String,
      default: ""
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
    hasSearchTitle: {
      type: Boolean,
      default: false
    },
    hasSchoolLevel: {
      type: Boolean,
      default: false
    },
    hasLocation: {
      type: Boolean,
      default: false
    },
    hasSort: {
      type: Boolean,
      default: false
    },
    hasFilterBtn: {
      type: Boolean,
      default: true
    },
    selectedType: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      filter: {
        province: null,
        district: null,
        village: null,
        level: get(this.$route, "query.type", ""),
        query: get(this.$route, "query.keyword", ""),
      },
      isShowFilter: false
    };
  },
  created() {
    console.log("[mounted] SchoolFilter query", get(this.$route, "query", {}))
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
      this.$emit("handleChangeSearch", val);
      this.filter.query = val;
    },
    handleSubmitSearch(val) {
      this.$emit("handleSubmitSearch", val);
      this.filter.query = val;
    },
    handleChangedLevel(level) {
      this.$emit("handleChangedLevel", level);
      const levelObj = this.schoolTypes.find(s => s.type == level);
      if(levelObj){
        this.filter.level = levelObj;
      }
    },
    handleEnterSearch(e) {
      const query = e.target.value
      this.filter.query = query;
      this.$emit("handleSubmitSearch", query);
    },
    handleChangedOrder(order) {
      this.$emit("handleChangedOrder", order);
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
