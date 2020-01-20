<template>
    <div class="elearning-slider-tab">
        <div class="toolbar">
            <h3 v-if="title">{{title}}</h3>
            <app-button @click="changeTab(1)" :color="tab === 1 ? 'primary' : 'info'" square v-if="sciences.length > 0">
                <IconNote/>
                Bài giảng
            </app-button>
            <app-button @click="changeTab(2)" :color="tab === 2 ? 'primary' : 'info'" square v-if="sciences.length > 0">
                <IconBooks/>
                Khóa học
            </app-button>
        </div>
        <div v-swiper:mySwiper="currentSwiperOptions" class="post-slider elearning-slider" v-on="$listeners">
            <div class="swiper-wrapper">
                <div class="swiper-slide elearning-slider-tab-container" v-for="(item, index) in list" :key="index">
                    <div class="slider-item" @click="$emit('click-item', item, index)">
                        <div class="elearning-slider-tab__image">
                            <img :src="item.image" alt/>
                            <div class="status-online" v-if="item.onlineStatus && item.online === 1">
                                {{item.onlineStatus}}
                            </div>
                            <div class="online" v-if="item.online">Trực tiếp</div>
                        </div>
                        <div class="bottom">
                            <n-link class="slider-title" v-if="item.name && currentSwiperOptions.showName" to>
                                {{item.name}}
                            </n-link>

                            <div class="elearning-slider-tab_teacher">
                                <div>
                                    <app-avatar :src="item.teacher.avatar" :size="20"/>
                                    <span class="name">{{item.teacher.name}}</span>
                                </div>
                                <div>
                                    <div class="stars">
                                        <IconStar width="12" height="12" v-for="index in item.teacher.star" :key="index"/>
                                        <IconStarO width="12" height="12" v-for="index in (5 - item.teacher.star)" :key="index"/>
                                    </div>
                                    <span><strong>{{item.teacher.star}}</strong> ({{item.teacher.starAmount}})</span>
                                </div>
                                <div class="price">{{item.price}}đ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="swiper-button-prev" v-if="currentSwiperOptions.navigation">
                <IconChevronLeft/>
            </div>
            <div class="swiper-button-next" v-if="currentSwiperOptions.navigation">
                <IconChevronRight/>
            </div>
            <div class="swiper-pagination" v-if="currentSwiperOptions.pagination"></div>
        </div>
    </div>
</template>

<script>
    import {assignIn} from "lodash";
    import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
    import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";
    import IconBooks from "~/assets/svg/icons/books.svg?inline";
    import IconNote from "~/assets/svg/icons/note.svg?inline";
    import IconStar from "~/assets/svg/icons/star.svg?inline";
    import IconStarO from "~/assets/svg/icons/star-o.svg?inline";

    export default {
        components: {
            IconChevronLeft,
            IconChevronRight,
            IconBooks,
            IconNote,
            IconStarO,
            IconStar,
        },

        props: {
            lessons: {
                type: Array,
                required: true,
                default: () => []
            },

            sciences: {
                type: Array,
                required: true,
                default: () => []
            },

            swiperOptions: {
                type: Object,
                default: () => {
                }
            },
            title: {type: String},
        },

        data() {
            const defaultSwiperOptions = {
                slidesPerView: "auto",
                spaceBetween: 4,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                pagination: false,
                showName: false
            };

            return {
                defaultSwiperOptions,
                currentSwiperOptions: assignIn(defaultSwiperOptions, this.swiperOptions),
                tab: 1,
                list: [],
            };
        },

        methods: {
            changeTab(tab) {
                this.tab = tab;
                this.list = tab === 1 ? [...this.lessons] : [...this.sciences];
            }
        },

        created() {
            this.list = this.lessons;
        }

    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/elearning/_elearning-slider-tab.scss";
</style>