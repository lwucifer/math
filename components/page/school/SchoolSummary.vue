<template>
    <div class="school-summary">
        <div class="partial">
            <div class="row">
                <!--Thumnail-->
                <div class="school-summary__thumnail">
                    <img :src="school.thumnail" alt/>
                </div>
                <!--End Thumnail-->

                <!--Contact-->
                <div class="school-summary__info">
                    <h2 class="school-summary__info__title text-primary">{{school.name}}</h2>
                    <div class="school-summary__info__contact" v-html="school.description"></div>
                </div>
                <!--End Contact-->

                <!--Number of teacher, students, ...-->
                <div class="school-summary__figure">
                    <div class="school-summary__figure__item text-center">
                        <div>
                            <span class="text-primary">{{ school.teachers }}</span>
                            <p>Giáo viên</p>
                        </div>
                    </div>

                    <div class="school-summary__figure__item text-center">
                        <div>
                            <span class="text-primary">{{ school.students }}</span>
                            <p>Học sinh</p>
                        </div>
                    </div>

                    <div class="school-summary__figure__item text-center">
                        <div>
                            <span class="text-primary">{{ school.lessons }}</span>
                            <p>Bài giảng</p>
                        </div>
                    </div>

                    <div class="school-summary__figure__item text-center">
                        <div>
                            <span class="text-primary">{{ school.courses }}</span>
                            <p>Khóa học</p>
                        </div>
                    </div>
                </div>
                <!--End Number of teacher, students, ...-->
            </div>
        </div>
        <div class="line"></div>
        <!--Intro-->
        <div class="partial">
            <div class="school-summary__intro">
                <h4>Giới thiệu</h4>
                <p>{{ school.intro }}</p>
            </div>
        </div>
        <!--End intro-->
        <div class="line"></div>

    </div>
</template>

<script>
    import IconPoint from "~/assets/svg/icons/point.svg?inline";
    import IconUser from "~/assets/svg/icons/user.svg?inline";

    export default {
        components: {
            IconPoint,
            IconUser
        },

        props: {
            school: {
                type: Object,
                required: true,
                default: () => {},
            },
        },

        data() {
            return {
            }
        }
    }
</script>

<style lang="scss">
    @import "~/assets/scss/components/school/_school-summary.scss";
</style>