<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="course-folder__side">
                    <CourseTeacher :teacher="teacher"/>
                    <div class="course-folder__side-links">
                        <n-link class="link-gray" to>Khóa học</n-link>
                        <n-link class="active link-gray" to>Kho nhập liệu</n-link>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="course-folder__main" v-if="isAuthenticated">
                    <div class="course-folder__toolbar">
                        <div>
                            <span class="h3">Kho nhập liệu</span>
                            <span class="category color-primary">Tất cả</span>
                        </div>
                        <div>
                            <app-date-picker v-model="time1" label="From" class="ml-auto"/>
                            <app-date-picker v-model="time2" label="To"/>
                        </div>
                    </div>
                    <div class="course-folder__list row">
                        <div class="col-lg-4 col-sm-6 col-xs-12 mb-4" v-for="item in list">
                            <n-link class="item" to>
                                <IconFolder/>
                                <span>{{item.name}}</span>
                            </n-link>
                        </div>
                    </div>
                    <hr/>
                    <div class="course-folder__categories">
                        <div class="nav-links">
                            <a square v-for="item in categories"
                               @click="activate(item.id)" :class="active_el === item.id ? 'active' : ''"
                            >
                                {{item.name}}
                            </a>
                        </div>
                        <div class="course-folder__files row">
                            <div class="col-lg-3 col-sm-2 col-xs-12" v-for="item in files">
                                <CourseFile :file="item"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="course-folder__main text-center" v-else>
                    <div class="course-folder__toolbar">
                        <div>
                            <span class="h3">Kho nhập liệu</span>
                            <span class="category color-primary">Tất cả</span>
                        </div>
                        <div>
                            <app-date-picker v-model="time1" label="From" class="ml-auto"/>
                            <app-date-picker v-model="time2" label="To"/>
                        </div>
                    </div>
                    <div class="upload-content">
                        <div class="upload-icon">
                            <IconUpload/>
                        </div>
                        <p class="text">Kéo thả file để tải lên hoặc</p>
                        <app-button color="white" square  @click="showModalNew = true">Thêm thư mục mới</app-button>
                        <CourseNewFolderModal :visible="showModalNew" @click-close="showModalNew = false"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CourseTeacher from "~/components/page/course/CourseTeacher";
    import CourseFile from "~/components/page/course/CourseFile";
    import AsideBox from "~/components/layout/asideBox/AsideBox";
    import IconFolder from "~/assets/svg/icons/folder.svg?inline";
    import IconUpload from "~/assets/svg/icons/upload.svg?inline";
    import CourseNewFolderModal from "~/components/page/course/CourseNewFolderModal";
    import {mapState} from 'vuex';
    import * as actionTypes from '~/utils/action-types';

    export default {
        name: "Course",

        components: {
            CourseNewFolderModal,
            CourseTeacher,
            CourseFile,
            IconFolder,
            IconUpload,
            AsideBox
        },

        data() {
            return {
                isAuthenticated: true,
                showModalNew: false,
                time1: null,
                time2: null,
                teacher: {
                    id: '1',
                    name: 'Savannah Mckinney',
                    avatar: 'https://picsum.photos/125/125',
                },
                list: [
                    {
                        id: 1,
                        name: 'Tenfolder'
                    }, {
                        id: 1,
                        name: 'Tenfolder'
                    }, {
                        id: 1,
                        name: 'Tenfolder'
                    }, {
                        id: 1,
                        name: 'Tenfolder'
                    }, {
                        id: 1,
                        name: 'Tenfolder'
                    }, {
                        id: 1,
                        name: 'Tenfolder'
                    },
                ],
                categories: [
                    {
                        id: 0,
                        name: 'Tất cả'
                    }, {
                        id: 2,
                        name: 'Video'
                    }, {
                        id: 3,
                        name: 'Ảnh'
                    }, {
                        id: 4,
                        name: 'Âm nhạc'
                    }, {
                        id: 5,
                        name: 'Tài liệu khác'
                    }
                ],
                files: [
                    {
                        id: 1,
                        name: 'Bài 1.mp4',
                        type: 1,
                        thumb: 'https://picsum.photos/178/124',
                    }, {
                        id: 2,
                        name: 'Tenbainayhatc8a9aTenbainayhatc8a9a',
                        type: 2,
                        thumb: 'https://picsum.photos/178/124',
                    }, {
                        id: 3,
                        name: 'Bài 1.mp4',
                        type: 3,
                        thumb: 'https://picsum.photos/178/124',
                    }, {
                        id: 4,
                        name: 'Chương 1.zip',
                        type: 4,
                        thumb: 'https://picsum.photos/178/124',
                    },
                ],
                active_el: 0
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

        methods: {
            openNewFolder: function () {

            },
            activate: function (el) {
                this.active_el = el;
            }
        }
    };
</script>

<style>
    @import "~/assets/scss/components/course/_course-folder.scss";
</style>