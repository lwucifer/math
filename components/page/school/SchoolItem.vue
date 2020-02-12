<template>
  <div class="elearning-item2">
    <div class="elearning-item2__image">
      <img :src="item.image" alt />
    </div>
    <div class="bottom">
      <n-link class="title" v-if="item.name" to>{{item.name}}</n-link>
      <div class="tags">
        <IconTag/>
      </div>
      <!--<div class="price">{{course.price}}đ</div>-->

      <!--<div class="elearning-item2_teacher">-->
        <!--<div>-->
          <!--<span class="name">{{item.teacher.name}}</span>-->
        <!--</div>-->
        <!--<div>-->
          <!--<div class="stars">-->
            <!--<app-stars :stars="3"/>-->
          <!--</div>-->
          <!--<span>-->
            <!--<strong>{{item.teacher.star}}</strong>-->
            <!--({{item.teacher.starAmount}})-->
          <!--</span>-->
        <!--</div>-->
        <!--<div class="price">{{item.price}}đ</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import IconPoint from "~/assets/svg/icons/point.svg?inline";
import IconTag from "~/assets/svg/icons/tag.svg?inline";

export default {
  components: {
    IconPoint,
    IconTag
  },

  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
/*@import "~/assets/scss/components/elearning/_elearning-item2.scss";*/
</style>