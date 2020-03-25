<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
              <ElearningManagerSide  active="8"/>
          </div>
          <div class="col-md-9 wrapContent__ElearningManagerRC">
              <div class="titleRateComment__ElearningManagerRC">
                  <span>Đánh giá và bình luận</span>
              </div>
              <div>
                  <app-divider class="divider__ElearningManagerRC"></app-divider>
            </div>
              <div>
                  <ElearningManagerRateComment/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import ElearningManagerRateComment from "~/components/page/elearning/manager/ratecomment/ElearningManagerRateComment";
export default {
    components:{
        ElearningManagerSide,
        ElearningManagerRateComment
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-rate-comment-index.scss";
</style>