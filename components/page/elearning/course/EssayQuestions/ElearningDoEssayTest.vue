<template>
    <div class="wrapTest">
        <div class="titleChoiceTest">
            <div>
                <strong>1. Bài giảng đại số lớp 10 - Bài tập tự luận</strong>
            </div>
        </div>
        <div class="timetest_ElearningCourse">
            <div>
                <span>Thời gian làm bài :</span>
                <span>50 phút</span>
            </div>
            <span style="margin-left:20px; margin-right:20px">|</span>
            <div>
                <span>Thời gian còn lại:</span>
                <span>50 phút</span>
            </div>
        </div>
        <div class="contentQuestion__ElearningCourse">
            <div class="d-flex flex-row  titleQuestion__ElearningCourse">
                <div class="d-flex flex-row align-items-center col" >
                    <span>Câu hỏi số</span>
                </div>
                <div class="col d-flex justify-content-end">
                    <span>In câu hỏi</span>
                </div>
            </div>
            <div class="contentEssayQuestion">
                <span>{{question}}</span>
            </div>
            <div class="d-flex flex-row  titleQuestion__ElearningCourse">
                <div class="d-flex flex-row align-items-center col" >
                    <span>Câu trả lời</span>
                </div>
                <div class="col d-flex justify-content-end">
                    <span>Soạn câu trả lời</span>
                </div>
            </div>
            <div class="answerEssayQuestion__ElearningCourse">
                <app-input textarea placeholder="Khung soạn thảo văn bản"></app-input>
            </div>
            <div class="d-flex flex-row groupbtnEssayTest__ElearningCourse">
                <div class="col">
                    <app-button square size="sm">Tải lên câu trả lời</app-button>
                </div>
                <div class="col d-flex justify-content-end">
                    <button class="btnSummitTest__ElearningCourse" v-on:click="changeDoneQuestion">Nộp bài</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            question:'Để bảo vệ mật khẩu ta phải làm gì'
        }
    },
    methods:{
        changeDoneQuestion(){
            this.$emit('updateDoneQuestion',true)
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/essayquestion/_elearning-course-do.scss";
</style>