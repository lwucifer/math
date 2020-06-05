<template>
  <filter-form>
    <div class="d-flex">
      <div
        class="filter-form__item filter-form__item--search"
        style="max-width: 36rem; min-width: 30rem;"
      >
        <app-search
          class="w-100"
          size="sm"
          bordered
          placeholder="Nhập để tìm kiếm"
          v-model="filters.keyword"
          @input="handleChangedSearch"
          @keyup.enter.native="submit"
          @submit="submit"
          color="primary"
        ></app-search>
      </div>
      <div class="filter-form__item">
        <filter-button @click="submit">Lọc kết quả</filter-button>
      </div>
      <!-- <div class="filter-form__item" v-if="filterSelect" style="min-width: 11rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="filterSelectClass"
          :reduce="item => item.value"
          v-model="filters.type"
          label="text"
          placeholder="Theo lớp"
          searchable
          has-border
          @input="handleSelectType"
        />
      </div>-->
      <!-- <div class="filter-form__item" v-if="filterSelect" style="min-width: 17rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="rates"
          :reduce="item => item.value"
          v-model="filters.rate"
          label="text"
          placeholder="Theo tiến độ hoàn thành"
          searchable
          clearable
          @input="handleSelectRate"
        />
      </div>-->
    </div>
  </filter-form>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import { ELEARNING_TYPES, ELEARNING_STATUSES } from "~/utils/constants";
import { mapState } from "vuex";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";
const STORE_PUBLIC_CLASSES = "elearning/teaching/public-classes";
export default {
  components: {
    IconFilter
  },
  data() {
    return {
      filterSelect: false,
      filters: {
        type: null,
        keyword: "",
        rate: null
      },
      types: [
        {
          value: ELEARNING_TYPES.LECTURE,
          text: "Bài giảng"
        },
        {
          value: ELEARNING_TYPES.COURSE,
          text: "Khóa học"
        }
      ],
      rates: [
        {
          value: ELEARNING_STATUSES.PASSED,
          text: "Đạt"
        },
        {
          value: ELEARNING_STATUSES.FAILED,
          text: "Không đạt"
        },
        {
          value: ELEARNING_STATUSES.PENDING,
          text: "Chưa chấm điểm"
        }
      ],
      initStatus: true
    };
  },
  computed: {
    ...mapState(STORE_SCHOOL_CLASSES, ["schoolClasses"]),
    ...mapState(STORE_PUBLIC_CLASSES, ["publicClassesList"]),
    filterSelectClass() {
      const dataFilter = this.publicClassesList ? this.publicClassesList : [];
      // this.schoolClasses &&
      // this.schoolClasses.data &&
      // this.schoolClasses.data.content
      //   ? this.schoolClasses.data.content
      //   : [];
      const data = dataFilter.map(item => {
        return {
          value: item.id,
          text: item.name
        };
      });
      data.push({
        value: "Khác",
        text: "Khác"
      });
      data.push({
        value: null,
        text: "Tất cả"
      });
      return data;
    }
  },
  watch: {
    filters: {
      handler(val, old) {
        this.initStatus = false;
        this.$emit("changedFilter", val);
      },
      deep: true
    }
  },
  methods: {
    submit() {
      if (this.filters.keyword != "") {
        this.$emit("submitFilter", this.filters);
      }
    },
    handleSelectRate(val) {
      this.$emit("changedRate", val);
    },
    handleSelectType(val) {
      this.$emit("changedType", val);
    },
    handleChangedSearch(val) {
      this.$emit("changedQuery", val);
      console.log("val", val);
      if (val == "") {
        this.$emit("submitFilter", this.filters);
      }
    },
    clickSubmit() {
      debugger;
      if (this.filters.keyword != "") {
        this.$emit("changedQuery", this.filters.keyword);
      }
      // if (this.filterSelect) {
      //   this.resetForm();
      //   this.filterSelect = false;
      //   if (!this.initStatus) {
      //     this.$emit("submitFilter", this.filters);
      //   }
      // } else {
      //   this.filterSelect = true;
      // }
    },
    resetForm() {
      this.filters.rate = null;
      this.filters.type = null;
      this.filters.query = "";
    }
  }
};
</script>

<style scoped lang="scss">
</style>