<template>
  <div class="container">
      <div class="wrap__ManagerStudent">
            <div class="title__ManagerStudent">
                <h5 class="color-primary mb-15">Danh sách học sinh</h5>
                <span>Danh sách học sinh lớp > </span><strong>Lớp 11B</strong>
                <hr/>
            </div>
            
            <div>
                <FilterTableClass/>
            </div>
      </div>
  </div>
</template>

<script>
import FilterTableClass from "~/components/page/manager/student/ManagerStudentClass"
export default {
    components:{
        FilterTableClass
    }
}
</script>

<style lang="scss">
 @import "~/assets/scss/components/manager/_manager-index-id.scss";
</style>