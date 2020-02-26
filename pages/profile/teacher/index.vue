<template>
<div class="container">
    <div class="wrapProfileTeacher">
        <ProfileTeacherHead/>
        <div class="wrapInfoTeacher">
            <strong>Thông tin giáo viên</strong>
            <span v-html="infoTeacher"></span>
        </div>
         <hr/>
    </div>
</div>
</template>

<script>
import ProfileTeacherHead from "~/components/page/profile/teacher/ProfileTeacherHead"
export default {
    data(){
        return{
            infoTeacher:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus accumsan quam non tempus. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum",
        }
    },
    components:{
        ProfileTeacherHead
    }
}
</script>

<style lang="scss">
    .wrapProfileTeacher{
        background: #FFFFFF;
        padding: 20px;
    }
    .wrapInfoTeacher{
        padding: 20px;
        display: flex;
        flex-direction: column;
        strong{
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            padding-bottom: 10px;
        }
        span{
            font-size: 14px;
            line-height: 19px;
            color: #666666;
        }
    }
</style>