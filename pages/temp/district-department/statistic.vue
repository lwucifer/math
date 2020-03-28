<template>
  <div class="container">
    <div class="title">
      <h3 class="pb-3">Thống kê - Phòng GDDT huyện Mê Linh</h3>
      <hr>
    </div>
    <filter-form />
    <div class="statistic__detail">
      <statistic-figure />
      <hr>
      <rank
        :actived="actived"
        :list="list"
        :title="rankTitle"
      >
      </rank>
    </div>
  </div>
</template>

<script>
  import FilterForm from '~/components/page/district-department/statistic/Filter'
  import StatisticFigure from '~/components/page/district-department/statistic/Figure'
  import Rank from '~/components/page/district-department/statistic/Rank'
  // Import faked data
  import { SCHOOL_RANK } from "~/server/fakedata/district-department/school-rank";

  export default {
    layout: 'manage',

    components: {
      FilterForm,
      StatisticFigure,
      Rank,
      Support: () => import('~/components/page/district-department/account/Support'),
    },

    data() {
      return {
        actived: 'school-rank',
        list: SCHOOL_RANK,
        rankTitle: 'Bảng đánh giá xếp hạng - phòng GDDT huyện MÊ LINH'
      };
    },

    computed: {

    },

    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/district-department/_statistic.scss";
</style>