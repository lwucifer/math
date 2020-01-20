<template>
    <div class="container elearning-account">
        <h1>Bài giảng và khóa học của tôi</h1>
        <div class="elearning-account__categories">
            <a class="link-gray active">Tất cả (5)</a>
            <a class="link-gray">Bài giảng (3)</a>
            <a class="link-gray">Khóa học (3)</a>
            <a class="link-gray">Yêu thích (3)</a>
            <a class="link-gray">Lưu trữ (0)</a>
        </div>
        <div class="elearning-account__toolbar">
            <app-button/>
        </div>
        <div class="row">
            <div class="custom-col-lg-5 col-md-3 col-sm-6 col-xs-12" v-for="item in  lessons">
                <ElearningItem :data="item"/>
            </div>
        </div>
    </div>
</template>

<script>
    import ElearningItem from "~/components/page/elearning/ElearningItem";

    import {mapState} from 'vuex';
    import * as actionTypes from '~/utils/action-types';

    export default {
        name: "E-learning",

        components: {
            ElearningItem,
        },

        data() {
            return {
                isAuthenticated: true,
                lessons: [
                    {
                        id: 1,
                        name: 'Nền tảng tiếng Anh cho người mới bắt đầu',
                        image: 'https://picsum.photos/218/130',
                        avatar: 'https://picsum.photos/218/130',
                        username: 'Trần Văn A',
                        status: 15,
                    },
                    {
                        id: 2,
                        name: 'Nền tảng tiếng Anh cho người mới bắt đầu',
                        image: 'https://picsum.photos/218/130',
                        avatar: 'https://picsum.photos/218/130',
                        username: 'Trần Văn A',
                        status: 35,
                    },{
                        id: 2,
                        name: 'Nền tảng tiếng Anh cho người mới bắt đầu',
                        image: 'https://picsum.photos/218/130',
                        avatar: 'https://picsum.photos/218/130',
                        username: 'Trần Văn A',
                        status: 55,
                    },{
                        id: 2,
                        name: 'Nền tảng tiếng Anh cho người mới bắt đầu',
                        image: 'https://picsum.photos/218/130',
                        avatar: 'https://picsum.photos/218/130',
                        username: 'Trần Văn A',
                        status: 35,
                    },{
                        id: 2,
                        name: 'Nền tảng tiếng Anh cho người mới bắt đầu',
                        image: 'https://picsum.photos/218/130',
                        avatar: 'https://picsum.photos/218/130',
                        username: 'Trần Văn A',
                        status: 35,
                    },{
                        id: 2,
                        name: 'Nền tảng tiếng Anh cho người mới bắt đầu',
                        image: 'https://picsum.photos/218/130',
                        avatar: 'https://picsum.photos/218/130',
                        username: 'Trần Văn A',
                        status: 35,
                    },
                ]
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

<style>
    @import "~/assets/scss/components/course/_course.scss";
</style>