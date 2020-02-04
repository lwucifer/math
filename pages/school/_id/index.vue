<template>
    <div class="container mb-6">
        <div class="row">
            <div class="col-md-3">
                <AsideBox title="Trường của tôi" class="school__side">
                    <div v-for="(item, index) in myschools" class="mb-3">
                        <n-link slot="title" to>{{item.name}}</n-link>
                    </div>
                    <app-button class="timeline-aside-btn mt-4" fullWidth>Tạo trường mới</app-button>
                </AsideBox>
            </div>
            <div class="col-md-9">
                <SchoolAbout :school="school"/>

                <div v-if="school.jobs.length > 0" class="mt-6 school-jobs">
                    <h3>Thông tin tuyển dụng</h3>
                    <div class="school-about__content-job" v-for="item in school.jobs">
                        <n-link to>{{item.name}}</n-link>
                    </div>
                </div>

                <PostListSlider :posts="posts" :swiperOptions="sliderOptions" :showName="true" :title="'Tin tức - sự kiện'" class="slider-box"/>
                <PostListSlider :posts="posts" :swiperOptions="sliderOptions" :showName="true" :title="'Sáng kiến - kinh nghiệm'"  class="slider-box"/>
                <PostListSlider :posts="posts" :swiperOptions="sliderOptions" :showName="true" :title="'Văn bản pháp luật'" class="slider-box"/>

                <PostSlider :images="images" :swiperOptions="sliderOptions2" :title="'Thư viện'" class="slider-box"/>
                <PostSlider :images="images" :swiperOptions="sliderOptions2" :title="'Thư viện ảnh'" class="slider-box"/>
                <PostSlider :images="videos" :swiperOptions="sliderOptions2" :title="'Video'"  class="slider-box"/>
            </div>
        </div>
    </div>
</template>

<script>
    import SchoolDetail from "~/components/page/school/SchoolDetail";
    import SchoolAbout from "~/components/page/school/SchoolAbout";
    import PostSlider from "~/components/page/timeline/post/PostSlider";
    import PostListSlider from "~/components/page/timeline/post/PostListSlider";
    import AsideBox from "~/components/layout/asideBox/AsideBox";
    import {mapState} from 'vuex';
    import * as actionTypes from '~/utils/action-types';

    export default {
        name: "School",

        watchQuery: ["school_id"],

        components: {
            SchoolDetail,
            AsideBox,
            PostSlider,
            PostListSlider,
            SchoolAbout
        },

        data() {
            return {
                isAuthenticated: true,
                school: {
                    id: '1',
                    name: 'Đại học Đại Nam',
                    logo: 'https://picsum.photos/171/171',
                    avatar: 'https://picsum.photos/251/251',
                    province: 'Hà Nội',
                    district: 'Hà Đông',
                    ward: 'Phú Lãm',
                    address: '69 ',
                    description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero rutrum, aliquam massa nec, egestas lacus. Aliquam tristique mollis turpis non tempor.</p><br/>' +
                        '<p><b>Cơ sở chính:</b> Phú Lãm, Hà Đông, Hà Nội</p>' +
                        '<p><b>Cơ sở 1:</b> 56 Vũ Trọng Phụng, Thanh Xuân, Hà Nội</p>' +
                        '<p><b>Điện thoại:</b> (024) 35577799 - Fax: (024) 35578759</p>' +
                        '<p><b>Email:</b> dnu@dainam.edu.vn</p>',
                    level: 1,
                    teachers: 10,
                    students: 1000,
                    status: 1,
                    jobs: [
                        {
                            id: 1,
                            name: 'Tuyển 01 giáo viên tiếng Anh',
                        },
                        {
                            id: 2,
                            name: 'Tuyển 05 đầu bếp căng tin',
                        }
                    ]
                },
                myschools: [
                    {
                        id: 1,
                        name: 'Đại học Đại Nam',
                    },
                    {
                        id: 2,
                        name: 'Trung tâm tiếng Anh Appolo',
                    }
                ],
                sliderOptions: {
                    spaceBetween: 10,
                    slidesPerView: 4,
                    setWrapperSize: true,
                    autoHeight: true,
                    watchOverflow: true,
                    navigation: false,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    showName: true
                },
                sliderOptions2: {
                    spaceBetween: 10,
                    slidesPerView: 4,
                    setWrapperSize: true,
                    autoHeight: true,
                    watchOverflow: true
                },
                posts: [
                    {
                        image_type: "image",
                        image: "https://picsum.photos/200/120",
                        id: 1,
                        name: "Thông báo: Tổ chức thi lần 3 học phần điều kiện tốt nghiệp TOEIC và Nguyên lý CBCN Mác",
                    },
                    {
                        image_type: "image",
                        image: "https://picsum.photos/200/120",
                        id: 2,
                        name: "ĐH Đại Nam phát động tuần lễ “nói không” với túi nilon và đồ nhựa sử dụng 1 lần",
                    },
                    {
                        image_type: "image",
                        image: "https://picsum.photos/200/120",
                        id: 3,
                        name: "Thông báo: Tổ chức thi lần 3 học phần điều kiện tốt nghiệp TOEIC và Nguyên lý CBCN Mác",
                    },
                    {
                        image_type: "image",
                        image: "https://picsum.photos/200/120",
                        id: 4,
                        name: "ĐH Đại Nam phát động tuần lễ “nói không” với túi nilon và đồ nhựa sử dụng 1 lần",
                    },
                    {
                        image_type: "image",
                        image: "https://picsum.photos/200/120",
                        id: 5,
                        name: "Thông báo: Tổ chức thi lần 3 học phần điều kiện tốt nghiệp TOEIC và Nguyên lý CBCN Mác",
                    },
                    {
                        image_type: "image",
                        image: "https://picsum.photos/200/120",
                        id: 6,
                        name: "ĐH Đại Nam phát động tuần lễ “nói không” với túi nilon và đồ nhựa sử dụng 1 lần",
                    },
                ],
                images: [
                    {
                        id: 1,
                        type: "image",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 2,
                        type: "image",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 3,
                        type: "image",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 4,
                        type: "image",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 5,
                        type: "image",
                        src: "https://picsum.photos/200/120"
                    },
                ],
                videos: [
                    {
                        id: 1,
                        type: "video",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 2,
                        type: "video",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 3,
                        type: "video",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 4,
                        type: "video",
                        src: "https://picsum.photos/200/120"
                    },{
                        id: 5,
                        type: "video",
                        src: "https://picsum.photos/200/120"
                    },
                ],
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