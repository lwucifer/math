<template>
    <div class="container mb-6">
        <div>
            <div class="top"
                v-if="isDepartment"
            >
                <app-button square>
                    <span class>Quản lý trường học</span>
                </app-button>
            </div>

            <school-summary :school="school" />

            <school-lesson-slider
                :items="lessons"
                :swiperOptions="sliderOptions"
                title="Bài giảng của trường"
            />

            <school-course-slider
                :items="courses"
                :swiperOptions="sliderOptions"
                title="Khóa học của trường"
            />
        </div>
    </div>
</template>

<script>
    import SchoolSummary from "~/components/page/school/SchoolSummary"
    import SchoolLessonSlider from "~/components/page/school/SchoolLessonSlider"
    import SchoolCourseSlider from "~/components/page/school/SchoolCourseSlider"
    import { mapState } from "vuex"
    import * as actionTypes from "~/utils/action-types";
    // Import faked data
    import { SCHOOL_SUMMARY, LESSONS, COURSES } from "~/server/fakedata/school/test";

    export default {

        watchQuery: ["school_id"],

        components: {
            SchoolSummary,
            SchoolLessonSlider,
            SchoolCourseSlider
        },

        data() {
            return {
                isAuthenticated: true,
                isDepartment: true,
                school: SCHOOL_SUMMARY,
                sliderOptions: {
                    spaceBetween: 20,
                    slidesPerView: 5,
                    setWrapperSize: true,
                    autoHeight: true,
                    watchOverflow: false,
                    navigation: false,
                    // pagination: {
                    //     el: ".swiper-pagination"
                    // },
                    pagination: false,
                    showName: true
                },
                lessons: LESSONS,
                courses: COURSES
            };
        },
        computed: {
            ...mapState("auth", ["loggedUser"]),
        },

        watch: {},

        methods: {}
    };
</script>

<style lang="scss" scoped>
    .top {
        text-align: right;
        padding: 2rem 2rem 0 2rem;
        background: #ffffff;
        button {
            font-size: 1.4rem;
            padding-right: 1.5rem;
            padding-left: 1.5rem;
        }
    }
</style>