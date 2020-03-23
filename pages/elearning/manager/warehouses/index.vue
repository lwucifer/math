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
                      <ElearningManagerUploadFile
                        @done="handleDoneAddFile"
                      />
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

import { createPayloadAddRepository } from "~/models/elearning/Repository";
import * as actionTypes from "~/utils/action-types";
import * as yup from "yup";
import {get} from "lodash";

const schema = yup.object().shape({
    name: yup.string().required(),
    // file: yup.object().required()
});

export default {
    components:{
        ElearningManagerSide,
        ElearningManagerUploadFile,
        ElearningManagerFilterTable
    },
    data() {
      return {

      }
    },
    methods: {
        handleUploadChange(fileList, event) {

        },
        handleDoneAddFile(data, event) {
            if (get(data, "success", false)) {
              this.$toasted.success(get(data, "message", ""));
              return;
            }
            this.$toasted.error(get(data, "message", ""));
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-material.scss";
</style>