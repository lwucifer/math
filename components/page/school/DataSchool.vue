<template>
    <div class="data-school">
        <div class="data-school__item">
            <span>{{get(this,"school.teacher_number")}}</span>Giáo viên
        </div>

        <div class="data-school__item">
            <span>{{get(this,"school.student_number")}}</span>Học sinh
        </div>

        <div class="data-school__item">
            <span>{{get(this,"school.lession_number")}}</span>Bài giảng
        </div>

        <div class="data-school__item">
            <span>{{get(this,"school.elearning_number")}}</span>Khoá học
        </div>
    </div>
</template>

<script>
import {get} from "lodash"
export default {
    props:{
        school:{
            type: Object,
            default: ()=>{}
        }
    },
    methods:{
        get
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_data-school.scss";
</style>