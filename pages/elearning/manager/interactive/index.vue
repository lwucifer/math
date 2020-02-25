<template>
  <div>
      <div class="container">
      <div class="row">
          <div class="col-md-3">
              <ElearningManagerSide  active="4"/>
          </div>
          <div class="col-md-9">
              <div class="wrapContentMaterials__ElearningManager">
                  <div class="titleMaterials__ElearningManager">
                     <span>Tương tác với học sinh</span>
                  </div>
                  <div>
                    <div class="elearning-manager-content__title__nav">
                        <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Hỏi đáp</a>
                        <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Thông báo</a>
                    </div>
                    
                  </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
export default {
    components:{
        ElearningManagerSide
    }
}
</script>

<style>

</style>