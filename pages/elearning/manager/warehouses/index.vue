<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
              <ElearningManagerSide  active="4"/>
          </div>
          <div class="col-md-9">
              <div class="wrapContentMaterials__ElearningManager">
                  <div class="titleMaterials__ElearningManager">
                     <span>Danh sách bài giảng và khóa học</span>
                  </div>
                  <app-divider></app-divider>
                  <div>
                      <ElearningManagerUploadFile/>
                  </div>
                  <div>
                      <ElearningManagerFilterTable/>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import ElearningManagerUploadFile from "~/components/page/elearning/manager/materials/ElearningManagerUploadFile";
import ElearningManagerFilterTable from "~/components/page/elearning/manager/materials/ElearningManagerFilterTable";
export default {
    components:{
        ElearningManagerSide,
        ElearningManagerUploadFile,
        ElearningManagerFilterTable
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-material.scss";
</style>