<template>
    <div class="wrap-courses-school" v-if="!isSearch">
        <SchoolCoursesSubject @showSearch="showSchoolSearch"/>
        <div class="highlight pt-0">
          <ElearningHomeBox>
            <h2 slot="title" class="heading-3 font-weight-medium mb-4">Bài giảng nổi bật</h2>

            <AppCarouseSchool
              class="pb-2"
              :options="{ slidesPerView: 4, spaceBetween: 24, preventClicksPropagation: false,slidesPerColumn: 2 }"
            >
              <template slot="default" slot-scope="{ classes }">
                <div
                  v-for="item in newestLecture && newestLecture.content || []"
                  :key="item.id"
                  :class="classes"
                >
                  <CourseItem2 class="my-0" :item="item" :size="'sm'" />
                </div>
              </template>
            </AppCarouseSchool>
            <div class="text-center mt-5">
                <app-button class="btn-show-all" @click="showSchoolSearch">Xem tất cả</app-button>
            </div>
          </ElearningHomeBox>
        </div>
        <div class="highlight pt-0 mt-4">
          <ElearningHomeBox>
            <h2 slot="title" class="heading-3 font-weight-medium mb-4">Khóa học nổi bật</h2>

            <AppCarouseSchool
              class="pb-2"
              :options="{ slidesPerView: 4, spaceBetween: 24, preventClicksPropagation: false,slidesPerColumn: 2 }"
            >
              <template slot="default" slot-scope="{ classes }">
                <div
                  v-for="item in newestCourse && newestCourse.content || []"
                  :key="item.id"
                  :class="classes"
                >
                  <CourseItem2 class="my-0" :item="item" :size="'sm'" />
                </div>
              </template>
            </AppCarouseSchool>
            <div class="text-center mt-5">
                <app-button class="btn-show-all" @click="showSchoolSearch">Xem tất cả</app-button>
            </div>
          </ElearningHomeBox>
        </div>
    </div>
    <SchoolCoursesSearch v-else/>
</template>

<script>
import SchoolCoursesSubject from "~/components/page/school/Courses/SchoolCoursesSubject"
import SchoolCoursesSearch from "~/components/page/school/Courses/SchoolCoursesSearch"
import AppCarouseSchool from "~/components/page/school/AppCarouseSchool";
import CourseItem2 from "~/components/page/course/CourseItem2";
import ElearningHomeBox from "~/components/page/elearning/home/ElearningHomeBox";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { ELEARNING_TYPES, SUBJECT_CODE } from "~/utils/constants";
import { get } from "lodash";
export default {
    components:{
        SchoolCoursesSubject,
        AppCarouseSchool,
        CourseItem2,
        ElearningHomeBox,
        SchoolCoursesSearch
    },
    data(){
        return{
            isSearch:false
        }
    },
    methods:{
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
        showSchoolSearch(){
            this.isSearch = true;
        }
    },
    created(){
        this.fetchNewestLecture();
        this.fetchtNewestCourse();
    },
    computed:{
        ...mapState("elearning/public/public-newest", [
            "newestLecture",
            "newestCourse"
        ]),
    }
}
</script>

<style lang="scss" scroped>
@import "~assets/scss/components/school/_courses-school.scss";
</style>