<template>
    <div class="school-news" id="news">
        <div class="school-news__title">Tin tức sự kiện</div>

        <div class="school-news__line"></div>

        <div class="school-news__content">
            <div class="row">
                <div class="col-12 col-md-4" v-for="(item, index) in dataFake" :key="index">
                    <SchoolNewsItem :data="item"/>
                </div>
            </div>
        </div>

        <div class="school-news__btn text-center">
            <app-button
                class="text-white"
                size="md"
                color="primary">
                Xem tất cả
            </app-button>
        </div>
    </div>
</template>

<script>
import SchoolNewsItem from "~/components/page/school/SchoolNewsItem"

export default {
    data() {
        return {
            dataFake: [
                {date: "20/05/2020", title: "Chuyên đề giáo dục kĩ năng sống chủ đề: phát triển sự tự tin"},
                {date: "20/05/2020", title: "Sơ kết học kì I và kỉ niệm 4 năm ngày trường đi vào hoạt động (04/01/2016 – 04/01/2020)"},
                {date: "20/05/2020", title: "Trao giải Võ Trường Toản cho 50 nhà giáo tiêu biểu của thành phố Hồ Chí Minh"}
            ]
        }
    },

    components: {
        SchoolNewsItem
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_school-news.scss";
</style>