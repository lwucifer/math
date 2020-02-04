<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <AsideBox title="Trường của tôi" class="school__side">
                    <div v-for="(item, index) in myschools" class="mb-3">
                        <n-link slot="title" :to="'/school/view'">{{item.name}}</n-link>
                    </div>
                    <app-button class="timeline-aside-btn mt-4" fullWidth>Tạo trường mới</app-button>
                </AsideBox>
            </div>
            <div class="col-md-9">
                <div class="row">
                    <div :class="classes" v-for="school in schools">
                        <SchoolDetail :school="school"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SchoolDetail from "~/components/page/school/SchoolDetail";
    import AsideBox from "~/components/layout/asideBox/AsideBox";
    import {mapState} from 'vuex';
    import * as actionTypes from '~/utils/action-types';

    export default {
        name: "School",

        watchQuery: ["school_id"],

        components: {
            SchoolDetail,
            AsideBox
        },

        data() {
            return {
                isAuthenticated: true,
                schools: [
                    {
                        id: '1',
                        name: 'Trường THCS Nguyễn Trường Tộ',
                        logo: 'https://picsum.photos/171/171',
                        avatar: 'https://picsum.photos/259/155',
                        province: 'Dr undefined Richardson',
                        district: 'Ranchview',
                        ward: '3891',
                        address: '69',
                        level: 1,
                        teachers: 10,
                        students: 1000,
                        status: 1
                    },
                    {
                        id: '2',
                        name: 'Trường THCS Nguyễn Trường Tộ',
                        logo: 'https://picsum.photos/171/171',
                        avatar: 'https://picsum.photos/259/155',
                        province: 'Hà Nội',
                        district: 'Cầu Giấy',
                        ward: 'Dịch Vọng',
                        address: '69',
                        level: 1,
                        teachers: 10,
                        students: 1000,
                        status: 1
                    },
                    {
                        id: '3',
                        name: 'Trường THCS Nguyễn Trường Tộ',
                        logo: 'https://picsum.photos/171/171',
                        avatar: 'https://picsum.photos/259/155',
                        province: 'Hà Nội',
                        district: 'Cầu Giấy',
                        ward: 'Dịch Vọng',
                        address: '69',
                        level: 1,
                        teachers: 10,
                        students: 1000,
                        status: 1
                    },
                    {
                        id: '4',
                        name: 'Trường THCS Nguyễn Trường Tộ',
                        logo: 'https://picsum.photos/171/171',
                        avatar: 'https://picsum.photos/259/155',
                        province: 'Hà Nội',
                        district: 'Cầu Giấy',
                        ward: 'Dịch Vọng',
                        address: '69',
                        level: 1,
                        teachers: 10,
                        students: 1000,
                        status: 1
                    },
                    {
                        id: '5',
                        name: 'Trường THCS Nguyễn Trường Tộ',
                        logo: 'https://picsum.photos/171/171',
                        avatar: 'https://picsum.photos/259/155',
                        province: 'Hà Nội',
                        district: 'Cầu Giấy',
                        ward: 'Dịch Vọng',
                        address: '69',
                        level: 1,
                        teachers: 10,
                        students: 1000,
                        status: 1
                    },
                    {
                        id: '6',
                        name: 'Trường THCS Nguyễn Trường Tộ',
                        logo: 'https://picsum.photos/171/171',
                        avatar: 'https://picsum.photos/259/155',
                        province: 'Hà Nội',
                        district: 'Cầu Giấy',
                        ward: 'Dịch Vọng',
                        address: '69',
                        level: 1,
                        teachers: 10,
                        students: 1000,
                        status: 1
                    },
                ],
                myschools: [
                    {
                        id: 1,
                        name: 'Đại học Đại Nam',
                    },
                    {
                        id: 2,
                        name: 'Trung tâm tiếng Anh Appolo',
                    }
                ]
            };
        },
        computed: {
            ...mapState("auth", ["loggedUser"]),
            classes() {
                return {
                    "col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4": !this.isAuthenticated,
                    "col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4": this.isAuthenticated,
                };
            }
        },

        watch: {},

        methods: {}
    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/school/_school.scss";
</style>