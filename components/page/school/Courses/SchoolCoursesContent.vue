<template>
    <div class="wrap-courses-school">
        <SchoolCoursesSubject/>
    </div>
</template>

<script>
import SchoolCoursesSubject from "~/components/page/school/Courses/SchoolCoursesSubject"
export default {
    components:{
        SchoolCoursesSubject
    }
}
</script>

<style>
.wrap-courses-school{
    padding:4.5rem 3.5rem;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
}
</style>