<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <CourseSide/>
            </div>
            <div class="col-md-9">
                <div class="course-detail__main">
                    <div class="course-detail__toolbar">
                        <span class="h3">Khóa học</span>
                    </div>
                    <div class="course-detail__content">
                        <h3 class="title">Kiểm duyệt khóa học</h3>
                        <div class="mt-3" v-if="!status">
                            <h4 class="mb-3">Cảm ơn Thầy/Cô đã tạo khóa học trên Schoolly</h4>
                            <p>
                                Aliqua nisi eu voluptate occaecat amet aute ad do excepteur consequat sit. Dolore tempor esse esse ipsum dolore ipsum mollit ipsum nulla duis esse ullamco. Eiusmod ut in consectetur in reprehenderit pariatur ut mollit duis ea eu nostrud enim.
                                Laboris duis laborum dolor incididunt sit enim deserunt ea ipsum cupidatat labore. Adipisicing excepteur est minim tempor deserunt reprehenderit adipisicing dolore. Minim occaecat qui reprehenderit exercitation ut esse. Laboris commodo qui laborum incididunt incididunt aute elit qui.
                                Mollit incididunt commodo ipsum nostrud do aute sunt reprehenderit do in. Dolore culpa in aute duis reprehenderit aute nulla laboris. Lorem eiusmod ipsum aliquip laborum dolor qui.
                                Ipsum magna non quis cillum incididunt mollit id consequat cupidatat nostrud.
                            </p>
                        </div>
                        <div class="text-center mt-6" v-else>
                            <IconSuccess/>
                            <h4 class="mt-2 mb-4">Gửi kiểm duyệt thành công</h4>
                            <n-link class="btn btn--color-primary color-white btn--square" to="/">Quay lại trang chủ</n-link>
                        </div>
                    </div>
                </div>
                <div class="course-detail__toolbar-bottom mt-4" v-if="!status">
                    <app-button color="info" square>Quay lại</app-button>
                    <app-button color="primary" square class="ml-auto">Gửi kiểm duyệt</app-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CourseSide from "~/components/page/course/CourseSide";
    import IconSuccess from "~/assets/svg/icons/success.svg?inline";
    import {mapState} from 'vuex';
    import * as actionTypes from '~/utils/action-types';

    export default {
        name: "Course",

        components: {
            CourseSide,
            IconSuccess
        },

        data() {
            return {
                status: false
            };
        },
        computed: {
            ...mapState("auth", ["loggedUser"]),
        },

        watch: {},

        methods: {
        }
    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/course/_course-detail.scss";
</style>