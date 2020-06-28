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
                <app-select
                    bordered
                    v-model="params.fee"
                    @change="handleChangeFee"
                    :options="feeOpts"
                    placeholder="Học phí"
                    size="sm"
                />
                <app-select
                    bordered
                    v-model="params.time"
                    @change="handleChangeTimes"
                    :options="timeOpts"
                    placeholder="Thời lượng"
                    size="sm"
                />
                <app-select
                    bordered
                    v-model="params.level"
                    @change="handleChangeLevel"
                    :options="levelOpts"
                    placeholder="Trình độ"
                    size="sm"
                
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

        <div v-if="loadingElearning" class="container mt-6">
            <div class="row">
                <div v-for="i in 16" :key="i" class="col-md-3 mb-6">
                    <div class="bg-white py-6 px-3">
                        <VclList />
                    </div>
                </div>
            </div>
        </div>

      <div class="row list-course-school-search" v-else-if="tab=='1'">
        <div
            v-for="item in courses && courses.content || []"
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
          v-for="item in lectures && lectures.content || []"
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
import { VclList } from "vue-content-loading";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { ELEARNING_TYPES, SUBJECT_CODE } from "~/utils/constants";
import { get } from "lodash";
import { optionSelectSubject } from "~/utils/common";

export default {
    components:{
        CourseItem2,
        VclList
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
            },
            params: {
                elearning_type: ELEARNING_TYPES.COURSE,
                school_id: null,
                subject: null,
                teacher: null,
                fee: null,
                level: null,
                school_id: null,
                page: 1,
                size: 12,
            },
            loadingElearning: false,
            feeOpts: [
                { value: null, text: "Tất cả" },
                { value: 1, text: "Miễn phí" },
                { value: 0, text: "Có phí" }
            ],
            timeOpts: [
                { value: null, text: "Tất cả" },
                { value: "0h-1h", text: "0 - 1 giờ" },
                { value: "1h-2h", text: "1- 2 giờ" },
                { value: "2h-4h", text: "2 - 4 giờ" },
                { value: "4h+", text: "Trên 4 giờ" }
            ],
        }
    },
    methods:{
        handleShowFilter(){
            this.filterSelect =!this.filterSelect;
        },
        async fetchLectures(){
            const params = this.params
            const rs = await this.$store.dispatch(
                `elearning/school/school-elearning/${actionTypes.SCHOOL_ELEARNING.LIST}`,
                {
                    params
                }
            );
            this.updatePagination()
        },
        async fetchCourses(){
            try {
                this.loadingElearning = true
                const params = this.params
                const rs = await this.$store.dispatch(
                    `elearning/school/school-elearning/${actionTypes.SCHOOL_ELEARNING.LIST}`,
                    {
                        params
                    }
                );
                this.updatePagination()
            } catch(error) {

            } finally {
                this.loadingElearning = false
            }
        },
        async fetchLevels() {
            await this.$store.dispatch(
                `elearning/public/public-levels/${actionTypes.ELEARNING.LEVEL}`
            );
        },
        changeTab(val){
            this.tab = val;
        },
        initParams(elearningType = ELEARNING_TYPES.LECTURE) {
            this.params = {
                elearning_type: ELEARNING_TYPES.COURSE,
                school_id: this.$route.params.id,
                teacher: null,
                fee: null,
                level: null,
                page: 1,
                size: 12,
            }
        },
        updateFilter(data) {
            this.params = { ...data }
        },
        updatePagination() {
            let paginationData;
            if (this.tab == 1) {
                paginationData = this.courses || {}
            } else if (this.tab == 2) {
                this.paginationData = this.lectures || {}
            } else {
                this.paginationData = {}
            }
            this.pagination = {
                total_pages: get(paginationData, "total_pages", 0),
                size: get(paginationData, "size", 10),
                total_elements: get(paginationData, "total_elements", 0),
                first: get(paginationData, "first", false),
                last: get(paginationData, "last", false),
                number: get(paginationData, "number", 0)
            };
        },
        async refreshData() {
            this.params.page = 1
            await this.fetchCourses()
        },
        handleChangeFee(_newVal, _selectedVal) {
            console.log("[handleChangeFee]", _newVal, _selectedVal);
            this.updateFilter({ fee: _newVal });
            this.refreshData();
        },

        handleChangeTimes(_newVal, _selectedVal) {
            console.log("[handleChangeTimes]", _newVal, _selectedVal);
            this.updateFilter({ time: _newVal });
            this.refreshData();
        },

        handleChangeLevel(_newVal, _selectedVal) {
            console.log("[handleChangeLevel]", _newVal, _selectedVal);
            this.updateFilter({ level: _newVal });
            this.refreshData();
        },
        get
    },
    computed:{
        ...mapState("elearning/public/public-levels", {
            levels: "levels"
        }),
        ...mapState("elearning/school/school-elearning", {
            lectures: "lecture",
            courses: "course"
        }),
        levelOpts() {
            const alls = optionSelectSubject(this.levels);
            return alls.map(c => {
                return {
                value: c.id,
                text: c.name
                };
            });
        },
    },
    async created(){
        this.initParams()
        await Promise.all([
            this.fetchLevels(),
            this.fetchLectures(),
            this.fetchCourses()
        ])
    },
}
</script>

<style lang="scss">
    .wrap-courses-school {
        .filter-form-school {
            .app-select {
                margin-right: 0.6rem;
                margin-left: 0.6rem;
            }
            .btn--filter {
                margin-right: 0.6rem;
            }
        }
    }
</style>