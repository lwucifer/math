<template>
    <div class="container">
        <course-slider-tab
            :lessons="lessons"
            :sciences="sciences"
            :swiperOptions="sliderOptions"
            title="Nổi bật"
        />
        <course-slider-tab
            :lessons="lessons"
            :sciences="sciences"
            :swiperOptions="sliderOptions"
            title="Gợi ý"
            class="mt-5"
        />
        <course-slider-tab
            :lessons="sciences"
            :swiperOptions="sliderOptions"
            title="Bài giảng mới nhất"
            class="mt-5"
        />
        <div class="text-center mt-3">
            <app-button square>Xem tất cả bài giảng</app-button>
        </div>
        <course-slider-tab
            :lessons="sciences"
            :swiperOptions="sliderOptions"
            title="Khóa học mới nhất"
            class="mt-5"
        />
        <div class="text-center mt-3">
            <app-button square>Xem tất cả khóa học</app-button>
        </div>
    </div>
</template>

<script>
    import CourseSliderTab from "~/components/page/course/CourseSliderTab"
    import { mapState } from "vuex"
    import * as actionTypes from "~/utils/action-types"
    // Import faked data
    import { LESSONS, SCIENCES } from "~/server/fakedata/course/courses"

    export default {

        components: {
            CourseSliderTab
        },

        data() {
            return {
                isAuthenticated: true,
                lessons: LESSONS,
                sciences: SCIENCES,
                sliderOptions: {
                    spaceBetween: 20,
                    slidesPerView: 5,
                    setWrapperSize: true,
                    autoHeight: true,
                    watchOverflow: true,
                    showName: true
                },
                active_el: 0
            };
        },
        computed: {
            ...mapState("auth", ["loggedUser"])
        },

        watch: {},

        methods: {}
    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/course/_course.scss";
</style>