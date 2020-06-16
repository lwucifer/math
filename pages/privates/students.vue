<template>
  <div class="container">
    <h3>Danh sách học sinh</h3>
    <div class="wrap-header-students">
      <div class="wrap_list-students">
        <app-search
          size="sm"
          v-model="params.query"
          @input="handleChangedSearch"
          @submit="handleSearch"
          placeholder="Tìm kiếm học sinh"
        />
        <filter-button
          class="mr-2"
          :color="isFilter ? 'primary' : 'white'"
          size="sm"
          @click="isFilter = !isFilter"
        />
        <div>
          <app-select
            v-if="isFilter"
            placeholder="Năm học"
            size="sm"
            :options="filterYears"
            class="mr-2"
            clearable
            @change="handleChangedYear"
          />
          <app-select
            v-if="isFilter"
            placeholder="Lớp học"
            size="sm"
            class="mr-2"
            v-model="params.class_id"
            :options="filterClasses"
            clearable
            @change="handleChangedClass"
          />
        </div>
        <!-- <div class="filter-form__item" style="min-width: 11rem;" v-if="isFilter">
          <app-vue-select
            class="app-vue-select w-100"
            :options="optionYear"
            placeholder="Năm học"
            size="sm"
            @input="handleChangedYear"
            clearable
          />
        </div>-->
        <!-- <app-select-school-year @input="handleChangedYear" /> -->
        <!-- <div class="filter-form__item" style="min-width: 11rem;" v-if="isFilter">
          <app-vue-select
            class="app-vue-select w-100"
            :options="optionClass"
            placeholder="Lớp học"
            size="sm"
            @input="handleChangedClass"
            clearable
          />
        <app-vue-select placeholder="Lớp học" size="sm" />-->
      </div>
      <div class="filter-avg-mark">
        <h6 class="mt-5 mb-2">Chọn cách tính điểm trung bình và tỷ lệ hoàn thành</h6>
        <div class="d-flex align-items-center">
          <app-select
            size="sm"
            v-model="params.cal_type"
            :options="filterAvgMark"
            @change="handleChangedAvgMark"
            clearable
          />
          <i
            v-if="checkProcess"
            class="ml-3"
          >* Điểm và tỷ lệ sẽ được tính dựa trên toàn bộ quá trình học tập của học sinh tính từ lúc tham gia đến niên khóa mà bạn lựa chọn.</i>
          <i
            v-else
            class="ml-3"
          >* Điểm và tỷ lệ sẽ được tính dựa vào quá trình học tập của học sinh trong niên khóa mà bạn lựa chọn.</i>
        </div>
      </div>
    </div>
    <div class="wrap-table">
      <app-table
        :heads="heads"
        :data="filterStudentPrivates"
        @pagechange="onPageChange"
        :pagination="filterPagination"
        :pagination-style="{ position: 'right' }"
        bg-table="white"
        :ext-table-cls="{ 'pt-4': true }"
        @sort="sortTable"
      >
        <template v-slot:cell(name)="{row}">
          <td class="wrap-name__table">{{get(row,"name","")}}</td>
        </template>
        <template v-slot:cell(joint_at)="{row}">
          <td class="wrap-name__table">{{get(row,"joint_at","")}}</td>
        </template>
        <template v-slot:cell(year)="{row}">
          <td class="wrap-name__table">{{get(row,"school_year","")}}</td>
        </template>
        <template v-slot:cell(class)="{row}">
          <td class="wrap-name__table">
            <div class="d-flex align-items-center">
              <span>
                {{get(row,"class_name","")}}
                <span
                  v-if="!!row.size"
                >(Sĩ số: {{ get(row,"size", 0) }})</span>
              </span>
              <v-popover
                trigger="hover"
                popoverClass="wrap-name-class__table"
                placement="top"
                v-if="row.homeroom_teacher"
              >
                <IconAccountBox24px class="fill-primary ml-2" />
                <template slot="popover">
                  <span class="text-primary">Giáo viên chủ nhiệm</span>
                </template>
              </v-popover>
            </div>
          </td>
        </template>
        <template v-slot:cell(medium_score)="{row}">
          <td class="wrap-name__table text-center">{{get(row,"medium_score", 0)}}</td>
        </template>
        <template v-slot:cell(completion_rate)="{row}">
          <td class="wrap-name__table">
            <div class="d-flex align-items-center">
              <span class="mr-3">{{ get(row,"completion_rate","") }}%</span>
              <div class="w-100">
                <app-progress :percentage="row.completion_rate" rounded />
              </div>
            </div>
          </td>
        </template>
      </app-table>
    </div>
    <!--
    <app-pagination
      :pagination="filterPagination"
      :type="1"
      @pagechange="onPageChange"
      class="right-pagination"
    />
    -->
  </div>
</template>

<script>
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
const STORE_NAME_STUDENTS = "elearning/teaching/students";
const STORE_NAME_CLASS = "elearning/teaching/teaching-class";
const STORE_NAME_YEARS = "elearning/public/public-school-year";
import IconAccountBox24px from "~/assets/svg/v2-icons/account_box_24px.svg?inline";
import { getDateFormat } from "~/utils/moment";
export default {
  async fetch({ params, store }) {
    const queryStudent = {
      cal_type: "SCHOOL_YEAR"
    };
    await Promise.all([
      store.dispatch(
        `${STORE_NAME_STUDENTS}/${actionTypes.TEACHING_STUDENTS_PRIVATE.LIST}`,
        {
          params: queryStudent
        }
      ),
      store.dispatch(
        `${STORE_NAME_YEARS}/${actionTypes.ELEARNING_PUBLIC_SCHOOL_YEAR.LIST}`
      )
      // store.dispatch(
      //   `${STORE_NAMESPACE}/${actionTypes.TEACHING_STUDENTS_PRIVATE.LIST}`,
      //   {
      //     params: {
      //       school_year_id
      //     }
      //   }
      // )
    ]);
  },
  components: {
    IconAccountBox24px
  },
  data() {
    return {
      heads: [
        {
          name: "name",
          text: "Họ và tên",
          sort: "true"
        },
        {
          name: "joint_at",
          text: "Ngày tham gia"
        },
        {
          name: "year",
          text: "Năm học"
        },
        {
          name: "class",
          text: "Lớp"
        },
        {
          name: "medium_score",
          text: "Điểm trung bình",
          sort: "true",
          classTextCenter: "true"
        },
        {
          name: "completion_rate",
          text: "Tỉ lệ hoàn thành các bài học và khóa học",
          sort: "true"
        }
      ],
      list: [
        {
          name: "Nguyễn Văn A",
          year: "2020",
          class: "10A",
          mark: 10,
          percent: 50
        },
        {
          name: "Nguyễn Văn A",
          year: "2020",
          class: "10A",
          mark: 10,
          percent: 50
        }
      ],
      pagination: {
        total_elements: 44,
        last: false,
        total_pages: 5,
        size: 10,
        number: 0,
        first: true,
        number_of_elements: 10
      },
      params: {
        page: 1,
        limit: 10,
        query: null,
        school_year: null,
        class_id: null,
        cal_type: "SCHOOL_YEAR",
        sort_by: null,
        sort_type: null
      },
      optionYear: [
        { value: "2018", text: "2018" },
        { value: "2019", text: "2019" },
        { value: "2020", text: "2020" }
      ],
      optionClass: [
        { value: "9A", text: "9A" },
        { value: "8C", text: "8C" },
        { value: "6B", text: "6B" },
        { value: "-1", text: "Khác" }
      ],
      filterAvgMark: [
        { value: "SCHOOL_YEAR", text: "Theo từng năm học" },
        { value: "PROCESS", text: "Theo quá trình học" }
      ],
      isFilter: false,
      checkProcess: false
    };
  },
  computed: {
    ...mapState(STORE_NAME_STUDENTS, ["studentPrivates"]),
    ...mapState(STORE_NAME_YEARS, ["years"]),
    ...mapState(STORE_NAME_CLASS, ["classes"]),
    filterStudentPrivates() {
      const data =
        this.studentPrivates && this.studentPrivates.content
          ? this.studentPrivates.content
          : [];
      const dataFilter = data.map(item => {
        return {
          ...item,
          joint_at: item && item.joint_at ? getDateFormat(item.joint_at) : ""
        };
      });
      return dataFilter;
    },
    filterPagination() {
      return this.studentPrivates && this.studentPrivates.page
        ? this.studentPrivates.page
        : {};
    },
    filterYears() {
      const data =
        this.years &&
        this.years.map(item => {
          return {
            value: item ? item.id : "",
            text: item ? item.from_year + " - " + item.to_year : ""
          };
        });
      data.push({ value: null, text: "Tất cả" });
      return data;
    },
    filterClasses() {
      const data =
        this.classes && this.classes.data ? this.classes.data.content : [];
      const dataMap = data.map(item => {
        return {
          value: item ? item.id : "",
          text: item ? item.name : ""
        };
      });
      dataMap.push({
        value: "-1",
        text: "Khác"
      });
      return dataMap;
    },
    filterCheckData() {
      return this.years ? true : false;
    }
  },
  methods: {
    get,
    ...mapActions(STORE_NAME_STUDENTS, ["teachingStudentsPrivatesList"]),
    onPageChange(e) {
      console.log("[onPageChange]", e);
      this.params.page = e.number + 1;
      this.teachingStudentsPrivatesList({ params: this.params });
    },
    handleChangedSearch(val) {
      console.log("[handleChangedSearch] val", val);
      if (val == "") {
        this.params.query = null;
      } else {
        this.params.query = val;
      }
    },
    handleSearch() {
      this.params.page = 1;
      this.teachingStudentsPrivatesList({ params: this.params });
    },
    async handleChangedYear(val) {
      this.params.class_id = null;
      console.log("val", val);
      if (val) {
        this.params.page = 1;
        this.params.school_year = val;
        this.teachingStudentsPrivatesList({
          params: this.params
        });
        await this.$store.dispatch(
          `${STORE_NAME_CLASS}/${actionTypes.ELEARNING_TEACHING_CLASS.LIST}`,
          {
            params: {
              school_year_id: val
            }
          }
        );
      } else {
        this.params.school_year = null;
        this.teachingStudentsPrivatesList({
          params: this.params
        });
      }
    },
    handleChangedClass(val) {
      if (val) {
        this.params.page = 1;
        // this.params.class_id = val;
        this.teachingStudentsPrivatesList({
          params: this.params
        });
      } else {
        this.params.page = 1;
        this.params.class_id = null;
        this.teachingStudentsPrivatesList({
          params: this.params
        });
      }
    },
    handleChangedAvgMark(val) {
      console.log("[handleChangedAvgMark] val", val);
      this.params.cal_type = val;
      this.teachingStudentsPrivatesList({
        params: this.params
      });
      if (val == "PROCESS") {
        this.checkProcess = true;
      } else {
        this.checkProcess = false;
      }
    },
    sortTable(val) {
      console.log("[sortTable] val", val);
      this.params.sort_by = val.sortBy;
      this.params.sort_type = val.order;
      this.teachingStudentsPrivatesList({
        params: this.params
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/privates/_students.scss";
</style>