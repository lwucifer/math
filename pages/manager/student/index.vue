<template>
  <div class="container">
      <div class="wrap__ManagerStudent">
            <div class="title__ManagerStudent">
                <h5 class="color-primary mb-15">Danh sách học sinh</h5>
                <hr/>
            </div>
            
            <div>
                <FilterTable/>
            </div>
      </div>
  </div>
</template>

<script>
import FilterTable from "~/components/page/manager/student/ManagerStudentFilterTable"
export default {
    components:{
        FilterTable
    }
}
</script>

<style lang="scss">
.wrap__ManagerStudent{
    background: #ffffff;
    padding: 20px;
    .title__ManagerStudent{
        padding: 20px;
    }
}
</style>