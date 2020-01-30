<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="elearning-history__side">
                    <div class="elearning-history__avatar">
                        <app-avatar :src="teacher.avatar" :size="125"/>
                        <a href>
                            <IconPhoto/>
                        </a>
                    </div>
                    <p class="elearning-history__name">{{teacher.name}}</p>
                    <div class="elearning-history__side-links">
                        <n-link class="link-gray" to>
                            <IconUser3/>
                            Thông tin tài khoản
                        </n-link>
                        <n-link class="link-gray" to>
                            <IconBell/>
                            Thông báo
                        </n-link>
                        <n-link class="link-gray active" to>
                            <IconHistory/>
                            Lịch sử giao dịch
                        </n-link>
                        <n-link class="link-gray" to>
                            <IconExclamation/>
                            Trợ giúp
                        </n-link>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="elearning-history__main">
                    <h3 class="color-primary">Lịch sử giao dịch</h3>
                    <div class="dates d-flex mb-4 mt-4">
                        <app-button rounded size="sm" v-if="isTeacher">
                            <IconFilter class="mr-2"/>
                            Lọc kết quả
                        </app-button>
                        <app-select class="ml-4" v-if="isTeacher" v-model="opt1" :options="opts1"/>

                        <app-date-picker v-model="time1" label="From" class="ml-auto"/>
                        <app-date-picker v-model="time2" label="To"/>

                        <app-button class="ml-4" square size="sm" v-if="isTeacher">
                            Tìm
                        </app-button>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Mã đơn hàng</th>
                                <th>Nội dung</th>
                                <th>Giá trị</th>
                                <th v-if="isTeacher">Loại GD</th>
                                <th>Phương thức thanh toán</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in list">
                                <td>{{ item.time }}</td>
                                <td>{{ item.code }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.price }} đ</td>
                                <td v-if="isTeacher && item.type === 1">Mua</td>
                                <td v-if="isTeacher && item.type === 2">Bán</td>
                                <td v-if="item.pay == 1">Chuyển khoản</td>
                                <td v-else>Thanh toán online</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ElearningSliderTab from "~/components/page/elearning/ElearningSliderTab";
    import IconExclamation from "~/assets/svg/icons/exclamation.svg?inline";
    import IconUser3 from "~/assets/svg/icons/user3.svg?inline";
    import IconHistory from "~/assets/svg/icons/history.svg?inline";
    import IconBell from "~/assets/svg/icons/bell.svg?inline";
    import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
    import IconFilter from "~/assets/svg/icons/filter.svg?inline";
    import IconSearch from "~/assets/svg/icons/search2.svg?inline";
    import {mapState} from 'vuex';
    import * as actionTypes from '~/utils/action-types';

    export default {
        name: "E-learning",

        components: {
            ElearningSliderTab,
            IconHistory,
            IconBell,
            IconUser3,
            IconExclamation,
            IconPhoto,
            IconSearch,
            IconFilter
        },

        data() {
            return {
                isAuthenticated: true,
                isTeacher: true,
                time1: null,
                time2: null,
                opt1: '',
                opts1: [
                    {value: '', text: "Loại giao dịch"},
                    {value: '1', text: "Mua"},
                    {value: '2', text: "Bán"}
                ],
                teacher: {
                    id: '1',
                    name: 'Savannah Mckinney',
                    avatar: 'https://picsum.photos/125/125',
                },
                list: [
                    {
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 2,
                        type: 2,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 2,
                        type: 2,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 1,
                        type: 1,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 1,
                        type: 2,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 1,
                        type: 1,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 1,
                        type: 1,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 1,
                        type: 1,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 1,
                        type: 1,
                        time: '16:50:30 19-11-2019'
                    },{
                        id: 1,
                        name: 'Mua khóa học Đại số 10',
                        price: '1290000',
                        code: 'S88HKDKD',
                        pay: 1,
                        type: 1,
                        time: '16:50:30 19-11-2019'
                    },
                ],
                active_el: 0
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
    @import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>