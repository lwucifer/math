<template>
  <div class="container">
      <div>
          <h5>Thống kê - Sở GDĐT tỉnh Vĩnh Phúc</h5>
          <hr class="mt-3"/>
          <FilterBar/>
          <div class="wrap-department-content">
              <div class="row department-revenue-items">
                <div class="item col-12 col-sm-2">
                    <p>Tổng số trường học</p>
                    <strong>10,000</strong>
                </div>
                <div class="item col-12 col-sm-2">
                    <p>Tổng số trường học</p>
                    <strong>10,000</strong>
                </div>
                <div class="item col-12 col-sm-2">
                    <p>Tổng số trường học</p>
                    <strong>10,000</strong>
                </div>
                <div class="item col-12 col-sm-2">
                    <p>Tổng số trường học</p>
                    <strong>10,000</strong>
                </div>
                <div class="item col-12 col-sm-2">
                    <p>Tổng số trường học</p>
                    <strong>10,000</strong>
                </div>
            </div>
            <hr class="mt-3 mb-3">
            <div class="wrap-department-revenue-nav">
                <strong>Bảng đánh giá xếp hạng - Sở GDĐT tỉnh Mê Linh</strong>
                <div class="department-revenue-content__title__nav">
                    <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Đánh giá xếp hạng phòng giáo dục</a>
                    <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Đánh giá xếp hạng trường học</a>
                    <a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Đánh giá xếp hạng giáo viên</a>
                </div>
                <div>
                    <keep-alive>
                        <component v-bind:is="currentTabComponent"></component>
                    </keep-alive>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import FilterBar from "~/components/page/department/DepartmentRevenueFilterBar"
const SchoolTab = ()=> import("./tabs/school")
const TeacherTab = ()=> import("./tabs/teacher")
const DepartmentTab = ()=> import("./tabs/department")
export default {
    components:{
        FilterBar,
        TeacherTab,
        SchoolTab,
        DepartmentTab
    },
    data(){
        return{
            tab:1
        }
    },
    computed:{
        currentTabComponent: function() {
        const MATCHED_TABS = ['DepartmentTab','SchoolTab', 'TeacherTab']
        return (this.tab > 0) ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0]
        }
    }
}
</script>
<style lang="scss">
@import "~/assets/scss/components/department/_department-revenue.scss";
</style>