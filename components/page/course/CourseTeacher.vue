<template>
    <div class="course-teacher">
        <app-avatar :src="teacher.avatar" :size="125"/>
        <p class="course-teacher__name">{{teacher.name}}</p>
        <p>Giảng viên</p>
        <n-link square class="mt-3 btn btn--color-primary btn--square color-white" to="/course/create">Tạo khóa học</n-link>
    </div>
</template>

<script>
    export default {
        components: {
        },

        props: {
            teacher: {
                type: Object,
                required: true,
                default: () => {},
            },
        },

        data() {
            return {
                isAuthenticated: true,
            }
        }
    }
</script>

<style lang="scss">
    @import "~/assets/scss/components/course/_course-teacher.scss";
</style>