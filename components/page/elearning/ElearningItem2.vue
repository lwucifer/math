<template>
    <div class="elearning-slider-tab">
        <div class="slider-item">
            <div class="elearning-slider-tab__image">
                <img :src="item.image" alt/>
                <div class="status-online" v-if="item.onlineStatus && item.online === 1">
                    {{item.onlineStatus}}
                </div>
                <div class="online" v-if="item.online">Trực tiếp</div>
            </div>
            <div class="bottom">
                <n-link class="slider-title" v-if="item.name" to>
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
            item: {
                type: Object,
                required: true,
                default: () => {}
            }
        }

    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/elearning/_elearning-slider-tab.scss";
</style>