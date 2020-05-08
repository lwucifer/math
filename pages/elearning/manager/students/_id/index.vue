<template>
  <div class="container">
    
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <sub-block-section
          title="Nguyễn Văn Nam"
          has-icon
        >
          <template v-slot:content>
            <div class="d-flex">
                <h5 class="text-primary">Thông tin học sinh</h5>
                <app-button
                    square
                    color="secondary"
                    size="sm"
                    class="btn-block__manager-student"
                >
                    <IconBlock24px class="icon mr-2"/>
                    Cấm học sinh này
                </app-button>
            </div>
          </template>
        </sub-block-section>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
import IconBlock24px from '~/assets/svg/v2-icons/block_24px.svg?inline';

import { mapState } from "vuex"
import { get } from "lodash"
import * as actionTypes from "~/utils/action-types"

export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    IconBlock24px
  },

  data() {
    return {

    }
  },
  computed: {
  
  },

  methods: {
    
  },
  created() {
    // this.getList()
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
.btn-block__manager-student{
    background: #EB5757;
    margin-left: auto;
}
</style>