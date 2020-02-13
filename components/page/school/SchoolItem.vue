<template>
  <div class="school-item">
    <div class="school-item__thumnail">
      <n-link :to="'/school/' + item.id">
        <img :src="item.image" :alt="item.name" />
      </n-link>
    </div>
    <div class="school-item__info">
      <n-link
          v-if="item.name"
          class="school-item__info__title"
          :to="'/school/' + item.id">
        {{ item.name }}
      </n-link>
      <div class="school-item__info__statistic-item">
        <span> <IconLocation/> </span>
        <span class="value">{{ item.address }}</span>
      </div>
      <div class="school-item__info__statistic-item">
        <span><IconUser/></span>
        <span class="value">{{ item.teacherNum }} giáo viên </span>
      </div>
      <div class="school-item__info__statistic-item">
        <span><IconUserGroup/></span>
        <span class="value">{{ item.studentNum }} học sinh </span>
      </div>
    </div>
  </div>
</template>

<script>
import IconLocation from "~/assets/svg/icons/location.svg?inline"
import IconUser from "~/assets/svg/icons/user-circle.svg?inline"
import IconUserGroup from "~/assets/svg/icons/user-group1.svg?inline"

export default {
  components: {
    IconLocation,
    IconUser,
    IconUserGroup
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
@import "~/assets/scss/components/school/_school-item.scss"
</style>