<template>
    <div class="course-teacher">
        <app-avatar :src="teacher.avatar" :size="125"/>
        <p class="course-teacher__name">{{teacher.name}}</p>
        <p>Giảng viên</p>
        <app-button square class="mt-3">Tạo khóa học</app-button>
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