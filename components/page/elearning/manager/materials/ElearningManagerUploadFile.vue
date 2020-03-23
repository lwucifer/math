<template>
  <div>
    <div class="row">
      <div class="col-6 titleUpload__ElearningManager">
        <span>Upload file</span>
      </div>
      <div class="col-md-6 wrapStorage__ElearningManager ">
        <div class="d-flex justify-content-end">
          <span>Dung lượng đã sử dụng:</span>
          <span> {{(memoryused*50)/100}}/50GB</span>
        </div>
        <div class="wrapProcessbarStorage__ElearningManager d-flex justify-content-end">
          <div class="processStorage__ElearningManager">
            <div class="barStorage_ElearningManager" v-bind:style="{width: memoryused +'%'}"></div>
          </div>
          <span>{{memoryused}}%</span>
        </div>
      </div>
    </div>
    <div class="wrapUploadFile__ElearningManager">
      <div class="titleFormatFile__ElearningManager">
              <span v-if="innerFileList.length" class="d-flex flex-row justify-content-center namefiles">
                <div v-for="item in innerFileList" :key="item.id">
                  <slot>{{item.name}}, </slot>
                  <!--
                  <slot name="fileName" :innerFileList="innerFileList">{{ innerFileList[0] ? innerFileList[0].name : '' }}</slot>
                  -->
                </div>
              </span>
        <span v-else>Các định dạng file hỗ trợ .mp4,pxdf, docx, .doc, .xls, ppt.</span>
      </div>
      <div class="wrapBtnUploadFile__ElearningManager">
        <button class="btnUploadFile__ElearningManager">
          <IconUploadFile class="iconUploadFile__ElearningManager"/>
          <span>Upload file</span>
        </button>
        <input
           ref="inputFile"
           type="file"
           multiple
           v-bind="$attrs"
           v-on="uploadListeners"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import IconUploadFile  from "~/assets/svg/design-icons/upload.svg?inline"
  import { createPayloadAddRepository } from "~/models/elearning/Repository";
  import {get} from "lodash";
  import * as yup from "yup";
  import * as actionTypes from "~/utils/action-types";

  const schema = yup.object().shape({
    name: yup.string().required(),
    // file: yup.object().required()
  });

  export default {
    data(){
      return{
        innerFileList: [],
        input: true,
        memoryused:20,
        files: [],
        payload: {
          file: '',
          name: ''
        }
      }
    },
    props: {
      multiple: Boolean,
      fileList: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String
      }
    },
    components:{
      IconUploadFile
    },
    computed: {
      uploadListeners: function() {
        const vm = this;
        return Object.assign(
          {},
          this.$listeners,
          {
            change: async function(event) {
              vm.innerFileList = event.target.files;
              const res = await vm.handleUpload(vm.innerFileList, event);
              vm.$emit("change", event.target.files, event);
              vm.$emit("done", res, event);
              vm.input = false;
            }
          }
        );
      },
    },

    methods: {
      triggerClickInput() {
        this.$refs.inputFile.click();
      },

      handleUpload(fileList, event) {
        const fileCounter = fileList.length;

        for(let i = 0; i < fileCounter; i++) {
          const tmp = fileList[i];
          this.payload.name = fileList[i].name;
          this.payload.file = fileList[i];
        }
        return this.addFile();
      },

      async addFile() {
        const modelData = createPayloadAddRepository(this.payload);
        const isValid = await this.validateAddFile(modelData);
        if (isValid) {
          const formData = new FormData();
          for (const key in modelData) {
            formData.append(key, modelData[key]);
          }

          const res = await this.$store.dispatch(
            `elearning/teaching/repository-files/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.ADD}`,
            formData
          );
          return res;
        }
      },

      async validateAddFile(data) {
        const isValid = await schema.isValid(data);
        return isValid;
      },

    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/material/_elearning-uploadfile.scss";
</style>