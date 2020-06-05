<template>
    <div class="school-noti" id="notification">
        <div class="school-noti__title">Thông báo</div>

        <div class="school-noti__line"></div>

        <div class="school-noti__content">
            <div class="row">
                <div class="col-12 col-md-8">
                    <div v-for="(item, index) in dataFake" :key="index" class="wrapper">
                        <SchoolNotiItem :data="item"/>
                    </div>
                    
                </div>

                <div class="col-12 col-md-4">
                    <div class="noti-bg">
                        <div class="noti-bg__img">
                            <img src="~assets/images/school/email.png" alt="">
                        </div>

                        <div class="noti-bg__text">
                            <n-link to="" class="text-white">Thông báo tuyển sinh đi học tại Hung-ga-ri năm 2018</n-link>
                            <p>20/05/2020</p>
                        </div>

                        <div class="noti-bg__btn">
                            <app-button
                                size="md"
                                class="text-white">Xem tất cả thông báo</app-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SchoolNotiItem from "~/components/page/school/SchoolNotiItem"

export default {
    components: {
        SchoolNotiItem
    },

    data () {
        return {
            dataFake: [
                {noti_title: 'Thông báo về học bổng của Nhật Bản dành cho cán bộ lãnh đạo trẻ', date: '20/05/2020'},
                {noti_title: 'Danh sách thí sinh đủ điều kiện xét tuyển kỳ xét tuyển viên chức (giáo viên) năm học 2017 - 2018 (đợt 2)', date: '20/05/2020'},
                {noti_title: 'Về tuyển sinh lớp ôn tập và thi cấp chứng chỉ Tin học Ứng dụng CNTT cơ bản', date: '20/05/2020'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_school-noti.scss";
</style>