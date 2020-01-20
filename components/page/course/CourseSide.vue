<template>
    <div class="course-folder__side">
        <CourseTeacher :teacher="teacher"/>
        <div class="course-folder__side-links">
            <n-link class="link-gray" to>Khóa học</n-link>
            <n-link class="link-gray" to>Kho nhập liệu</n-link>
        </div>
    </div>
</template>

<script>
    import CourseTeacher from "~/components/page/course/CourseTeacher";

    export default {
        components: {
            CourseTeacher
        },

        data() {
            return {
                isAuthenticated: true,
                teacher: {
                    id: '1',
                    name: 'Savannah Mckinney',
                    avatar: 'https://picsum.photos/125/125',
                },
            }
        }
    }
</script>

<style lang="scss">
    @import "~/assets/scss/components/course/_course.scss";
</style>