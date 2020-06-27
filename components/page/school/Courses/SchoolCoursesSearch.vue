<template>
  <div class="wrap-courses-school">
      <div class="d-flex align-items-center">
          <h3>{{ get(this,'typeSearch','') }}</h3>
          <p class="ml-3">(<strong>50</strong> Bài giảng - <strong>20</strong> khóa học)</p>
      </div>
      <div class="d-flex mb-5 mt-3">
          <div class="filter-form-school">
              <filter-button
                :color="filterSelect ? 'primary': 'white'"
                @click="handleShowFilter"
                >
              </filter-button>
              <div class="d-flex w-100" v-if="filterSelect">
                  <app-vue-select
                    class="app-vue-select w-100"
                    placeholder="Học phí"
                    has-border
                  />
                  <app-vue-select
                    class="app-vue-select w-100"
                    placeholder="Thời lượng"
                    has-border
                  />
                  <app-vue-select
                    class="app-vue-select w-100"
                    placeholder="Trình độ"
                    has-border
                  />
              </div>
          </div>
          <div class="sort-courses-school">
              <span class="nowrap mr-3">Sắp xếp theo:</span>
              <app-vue-select
                    class="app-vue-select w-100"
                    placeholder="Mới nhất"
                    has-border
                  />
          </div>
      </div>
      <div class="school-course-menu-tab">
        <span @click="changeTab('1')">
            <n-link 
                :class="tab=='1' ?  'active' : ''"
                to
            >
                BÀI GIẢNG
            </n-link>
        </span>
        <span  @click="changeTab('2')">
            <n-link 
                :class="tab=='2' ?  'active' : ''"
                to
            >
                KHÓA HỌC
            </n-link>
        </span>
      </div>
      <div class="row list-course-school-search" v-if="tab=='1'">
        <div
          v-for="item in newestCourse && newestCourse.content || []"
          :key="item.id"
          class="col-md-3"
        >
            <CourseItem2 :item="item" :size="'sm'" />
        </div>
        <app-pagination
            :pagination="pagination"
            class="mt-5 w-100"
        />
      </div>
      <div class="row list-course-school-search" v-if="tab=='2'">
        <div
          v-for="item in newestLecture && newestLecture.content || []"
          :key="item.id"
          class="col-md-3"
        >
            <CourseItem2 :item="item" :size="'sm'" />
        </div>
        <app-pagination
            :pagination="pagination"
            class="mt-5 w-100"
        />
      </div>
  </div>
</template>

<script>
import CourseItem2 from "~/components/page/course/CourseItem2";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { ELEARNING_TYPES, SUBJECT_CODE } from "~/utils/constants";
import { get } from "lodash";
export default {
    components:{
        CourseItem2
    },
    props:{
        typeSearch:{
            type: String,
            default: 'Bài giảng - Khóa học'
        },
    },
    data(){
        return{
            tab:'1',
            filterSelect:false,
            pagination:{
                total_pages: 2,
                size: 10,
                total_elements: 20,
                first: 1,
                last: 0,
                number: 1
            }
        }
    },
    methods:{
        handleShowFilter(){
            this.filterSelect =!this.filterSelect;
        },
        fetchNewestLecture(){
            const rs = this.$store.dispatch(
                `elearning/public/public-newest/${actionTypes.ELEARNING_PUBLIC_NEWEST.LIST_LECTURE}`,
                {
                params: {
                    type: ELEARNING_TYPES.LECTURE
                }
                }
            );
        },
        fetchtNewestCourse(){
            const res = this.$store.dispatch(
                `elearning/public/public-newest/${actionTypes.ELEARNING_PUBLIC_NEWEST.LIST_COURSE}`,
                {
                params: {
                    type: ELEARNING_TYPES.COURSE
                }
                }
            );
        },
        changeTab(val){
            this.tab = val;
        },
        get
    },
    computed:{
        ...mapState("elearning/public/public-newest", [
            "newestLecture",
            "newestCourse"
        ]),
    },
    created(){
        this.fetchNewestLecture();
        this.fetchtNewestCourse();
    },
}
</script>

<style lang="scss">

</style>