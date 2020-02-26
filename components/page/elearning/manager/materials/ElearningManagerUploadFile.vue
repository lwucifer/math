<template>
  <div>
      <div class="row">
          <div class="col-6 titleUpload__ElearningManager">
              <span>Upload file</span>
          </div>
          <div class="col-md-6 wrapStorage__ElearningManager ">
              <div class="d-flex justify-content-end">
                  <span>Dung lượng đã sử dụng:</span>
                  <span> 1/50GB</span>
              </div>
              <div class="wrapProcessbarStorage__ElearningManager d-flex justify-content-end">
                  <div class="processStorage__ElearningManager">
                      <div class="barStorage_ElearningManager"></div>
                  </div>
                  <span>5%</span>
              </div>
          </div>
      </div>
      <div class="wrapUploadFile__ElearningManager">
          <div class="titleFormatFile__ElearningManager">
              <span v-if="innerFileList.length">
                <slot name="fileName" :innerFileList="innerFileList">{{ innerFileList[0] ? innerFileList[0].name : '' }}</slot>
              </span>
              <span v-else>Các định dạng file hỗ trợ .mp4,pxdf, docx, .doc, .xls, ppt.</span>
          </div>
          <div class="wrapBtnUploadFile__ElearningManager">  
              <button class="btnUploadFile__ElearningManager">
                  <IconUploadFile class="iconUploadFile__ElearningManager"/>
                  <span>Upload file</span>
              </button>
              <input v-if="input"
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
export default {
    data(){
        return{
            innerFileList: [],
            input: true,
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
          change: function(event) {
            vm.innerFileList = event.target.files;
            vm.$emit("change", event.target.files, event);
            vm.input = false;
            console.log(vm.innerFileList)
            
          }
        }
      );
    }
  },

  methods: {
    triggerClickInput() {
      this.$refs.inputFile.click();
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/material/_elearning-uploadfile.scss";
</style>