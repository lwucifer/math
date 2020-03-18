<template>
  <div class="container">
      <div class="department-introduce">
          <p>{{department.introduce}}</p>
      </div>
      <div class="list-school-province">
          <strong>Danh sách các trường học trực thuộc quản lý của {{department.name}}</strong>
      </div>
      <div class="d-flex flex-row align-items-center">
          <div class="department-filter__form__item">
            <app-button
            color="primary"
            @click="submit"
            class="department-filter__btn-submit"
            >
            <IconFilter />
            <span>Lọc kết quả</span>
            </app-button>
        </div>
        <div class="department-filter-select">
            <div>
                <app-vue-select
                placeholder="Theo huyện"
                />
            </div>
            <div>
                <app-vue-select
                placeholder="Theo xã phường"
                />
            </div>
            <div>
                <app-vue-select
                placeholder="Theo cấp học"
                />
            </div>
        </div>
      </div>
      <hr class="my-4"/>
      <div v-for="(category, index) in categories" :key="index">
        <department-list-box
          :category="category"
          @showAll="showAll"
          :schoolSearch="schoolSearch"
        >
        </department-list-box>
      </div>
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline"
import {DEPARTMENT} from "~/server/fakedata/department/test"
import DepartmentListBox from "~/components/page/department/DepartmentListBox"
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
export default {
    layout:"department",
    data(){
        return{
            isAuthenticated:true,
            department: DEPARTMENT,

        }
    },
    components:{
        IconFilter,DepartmentListBox
    },
    async fetch({ params, query, store }) {
        await store.dispatch(
        `elearning/school/school-search/${actionTypes.ELEARNING_SCHOOL_SEARCH.LIST}`
        );
        await store.dispatch(
        `elearning/public/public-category/${actionTypes.ELEARNING_PUBLIC_CATEGORY.LIST}`
        );
    },
  computed: {
    ...mapState("elearning/school/school-search", {
      schoolSearch: "elearningSchoolSearch"
    }),
    ...mapState("elearning/public/public-category", {
      categories: "categories"
    })
  },
   
}
</script>

<style lang="scss">
@import "~/assets/scss/components/department/_department-index.scss";
</style>