<template>
  <div class="ee-comments">
    <div class="ee-comment-item">
      <div class="ee-comment-item__top">
        <div class="ee-comment-item__heading">Bài tập 1</div>
        <div class="ee-comment-item__point">
          Điểm:
          <b>6/10 (Đạt)</b>
        </div>
      </div>

      <div class="ee-comment-item__comment">Nhận xét của giáo viên: Lorem ipsum ...</div>

      <div class="ee-comment-item__question-item" v-for="i in 4" :key="i">
        <div class="ee-comment-item__title">Câu hỏi 1</div>
        <app-input
          textarea
          :autosize="false"
          readonly
          value="Consequat laboris aliquip duis labore aliquip adipisicing anim. Culpa dolore ullamco ea elit proident veniam amet exercitation deserunt nisi id mollit ullamco. Aute ullamco eu est non ullamco enim. Aliquip elit nostrud quis cupidatat aliquip incididunt ipsum enim irure incididunt amet amet commodo cupidatat. Commodo et nisi cupidatat adipisicing amet elit elit elit laboris ipsum culpa cupidatat veniam exercitation. Incididunt proident ipsum deserunt eu id ut amet reprehenderit est tempor proident esse amet."
        />

        <div class="ee-comment-item__title">Câu trả lời</div>
        <app-input
          textarea
          :autosize="false"
          readonly
          value="Consequat laboris aliquip duis labore aliquip adipisicing anim. Culpa dolore ullamco ea elit proident veniam amet exercitation deserunt nisi id mollit ullamco. Aute ullamco eu est non ullamco enim. Aliquip elit nostrud quis cupidatat aliquip incididunt ipsum enim irure incididunt amet amet commodo cupidatat. Commodo et nisi cupidatat adipisicing amet elit elit elit laboris ipsum culpa cupidatat veniam exercitation. Incididunt proident ipsum deserunt eu id ut amet reprehenderit est tempor proident esse amet."
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-comments.scss";
</style>