<template>
    <div class="school-lesson-item">
        <div class="school-lesson-item__image">
            <img :src="item.image" alt/>
            <div class="status-online" v-if="item.onlineStatus && item.online === 1">{{item.onlineStatus}}</div>
            <div class="online" v-if="item.online">Trực tiếp</div>
            <div class="video" v-if="item.video">
                <IconVideo3/>
            </div>
        </div>
        <div class="bottom">
            <n-link class="title" v-if="item.name" to>{{item.name}}</n-link>

            <div class="school-lesson-item_teacher">
                <div>
                    <app-avatar :src="item.teacher.avatar" :size="20"/>
                    <span>
                        <n-link class="name" to>
                            {{item.teacher.name}}
                        </n-link>
                    </span>
                </div>
                <div>
                    <div class="stars">
                        <app-stars :stars="3"/>
                    </div>
                    <span class="text-right">
                        <strong>{{item.teacher.star}}</strong> <br>
                        ({{item.teacher.starAmount}})
                    </span>
                </div>
                <div class="price-wrapper">
                    <span
                        v-if="item.price > 0"
                        class="price"
                    >
                        {{ item.price | toThousandFilter }}đ
                    </span>
                    <span
                        v-else
                        class="price price--free"
                    >
                        Miễn phí
                    </span>
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
    import IconVideo3 from "~/assets/svg/icons/video3.svg?inline";

    export default {
        components: {
            IconChevronLeft,
            IconChevronRight,
            IconBooks,
            IconNote,
            IconVideo3
        },

        props: {
            item: {
                type: Object,
                required: true,
                default: () => {
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/school/_school-lesson-item.scss";
</style>