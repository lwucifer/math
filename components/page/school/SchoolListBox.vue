<template>
    <div class="school-list-box">
        <div class="school-list-box__title">
            <h4>
                <span class="school-list-box__title__name">{{ name }}</span>
                <span class="school-list-box__title__description">
          (
          {{ schoolNum }} trường học -
          {{ teacherNum }} giáo viên -
          {{ studentNum }} học sinh
        </span>
            </h4>
        </div>
        <!--List schools-->
        <div class="school-list-box__content">
            <div class="row row--school-list">
                <div
                    class="custom-col-lg-5 col-3 col-sm-6 col-xs-12"
                    v-for="(item, index) in items"
                    :key="index"
                >
                    <school-item :item="item"/>
                </div>
            </div>
        </div>
        <div class="school-list-box__footer">
            <div class="text-center">
                <app-button
                    square
                    class="mt-3 school-list-box__footer__submit-btn"
                    @click="showAll"
                >
                    <span class="">Xem tất cả</span>
                </app-button>
            </div>
        </div>
    </div>
</template>

<script>
    import SchoolItem from "~/components/page/school/SchoolItem"

    export default {
        components: {
            SchoolItem
        },

        props: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            schoolNum: {
                type: Number,
                required: true
            },
            teacherNum: {
                type: Number,
                required: true
            },
            studentNum: {
                type: Number,
                required: true
            },
            items: {
                type: Array,
                required: true,
                default: () => []
            }
        },

        methods: {
            showAll() {
                console.log('[Component] SchoolListBox: Click `Xem tat ca`')
                this.$emit('showAll', this.id)
            }
        }
    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/school/_school-list-box.scss";
</style>