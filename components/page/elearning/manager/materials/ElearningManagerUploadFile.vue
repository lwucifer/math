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
          <div class="processStorage__ElearningManager mb-0">
            <div class="barStorage_ElearningManager mb-0" v-bind:style="{width: memoryused +'%'}"></div>
          </div>
          <span>{{memoryused}}%</span>
        </div>
      </div>
    </div>

    <div class="wrapUploadFile__ElearningManager">
      <div class="titleFormatFile__ElearningManager">
        <span>
          *Các định dạng file hỗ trợ .mp4, .pdf, .docx, .doc, .xls, .xlsx, .ppt.
        </span>
      </div>
      <div
        class="wrapBtnUploadFile__ElearningManager"
        @drop="handleDrop"
        @dragover="handleDragover"
        @dragenter="handleDragover"
      >

        <!--Upload notification-->
        <div class="upload-alert" v-show="false">
          <!--Upload fail-->
          <div class="upload-alert--error">
            <div class="upload-alert--error__info mb-2">
              <div style="line-height: 100%;">
                <IconClose class="icon icon--close-alert" />
              </div>
              <div>
                <span class="upload-alert--error__mess">Tải lên không thành công</span>
              </div>
            </div>

            <div class="upload-alert--error__status">
              Dung lượng vượt quá giới hạn
            </div>
          </div>

          <!--Upload success-->
          <div class="upload-alert--success">
            <p class="upload-alert--success__title">
              <IconSuccess class="icon"/>
              <span>
                Tải lên thành công
              </span>
            </p>
            <div class="">
              <div class="process--upload">
                <div class="process--upload__percentage" v-bind:style="{width: memoryused +'%'}"></div>
              </div>
              <IconCloseOutline class='icon icon-uploading-cancel' title="Hủy"/>
            </div>
            <p class="file-name mb-2">Tên file.mp4</p>
          </div>

          <!--Button continue uploading-->
          <div class="text-center" v-show="false">
            <app-button
              size="sm"
              square
              color="white"
              class="btn--other-file bg-white"
            >
              <IconUploadFile class=""/>
              Tải lên một file khác
            </app-button>
          </div>
        </div>

        <!--Uploading-->
        <div class="py-3" v-show="false">
          <p class="file-name mb-2"><b>Tên file.mp4</b></p>
          <div class="mb-3" style="padding-right: 2.7rem; position: relative">
            <div class="process--upload">
              <div class="process--upload__percentage" v-bind:style="{width: memoryused +'%'}"></div>
            </div>
            <IconCloseOutline class='icon icon-uploading-cancel' title="Hủy"/>
          </div>
          <p class="process--upload__status">
            <span>30</span>% - <span>544</span>KB/s (<span>20</span>MB)
          </p>
        </div>

        <!--Drag & drop file-->
        <div class="text-center" v-show="true">
          <div>
            <button
              class="btnUploadFile__ElearningManager"
              @click="handleUpload"
            >
              <IconUploadFile class="iconUploadFile__ElearningManager"/>
            </button>
          </div>
          <p class="mt-3 text-instruction">Click để chọn tập tin hoặc kéo thả tập tin vào đây để tải lên.</p>
          <input
            ref="upload-input"
            type="file"
            accept=".xlsx, .xls, .doc, .docx, .pdf, .png, .mp4, .m4v, .ppt"
            @change="handleClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IconUploadFile from "~/assets/svg/icons/upload-cloud.svg?inline"
  import IconCloseOutline from '~/assets/svg/icons/Close-outline.svg?inline'
  import IconClose from '~/assets/svg/icons/close.svg?inline'
  import IconSuccess from '~/assets/svg/icons/success.svg?inline'
  import {createPayloadAddRepository} from "~/models/elearning/Repository"
  import {get} from "lodash"
  import * as yup from "yup"
  import * as actionTypes from "~/utils/action-types"
  import { MAX_UPLOADED_REPOSITORY_FILE_SIZE } from "~/utils/config"

  const schema = yup.object().shape({
    name: yup.string().required(),
    // file: yup.object().required()
  });

  export default {
    data() {
      return {
        memoryused: 20,
        payload: {
          file: '',
          name: ''
        },
        loading: false,
        notification: {
          type: null,
          message: '',
          reason: ''
        },
        recentFile: {},
        uploadPercentage: 0
      }
    },
    props: {
      multiple: Boolean,
      beforeUpload: Function, // eslint-disable-line
      onSuccess: Function,// eslint-disable-line
    },
    components: {
      IconUploadFile,
      IconCloseOutline,
      IconClose,
      IconSuccess
    },
    computed: {
    },
    watch: {
      uploadPercentage: function(newVal, oldVal) {
        console.log('uploadPercentage change: ', newVal)
      }
    },
    methods: {
      async addFile(rawFile) {
        this.payload.name = rawFile.name;
        this.payload.file = rawFile;
        const modelData = createPayloadAddRepository(this.payload);

        const payload = new FormData();
        for (const key in modelData) {
          payload.append(key, modelData[key]);
        }

        let config = {
          onUploadProgress: progressEvent => {
            console.log('change upload status')
            this.uploadPercentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          }
        }

        const res = await this.$store.dispatch(
          `elearning/teaching/repository-files/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.ADD}`, { payload, config }
        );
        return res;
      },
      async validateAddFile(data) {
        const isValid = await schema.isValid(data);
        return isValid;
      },
      handleDrop(e) {
        e.stopPropagation()
        e.preventDefault()
        if (this.loading) return

        const files = e.dataTransfer.files

        if (files.length !== 1) {
          this.$toasted.error("Only support uploading one file!")
          return
        }

        const rawFile = files[0] // only use files[0]
        if (!this.isValidFile(rawFile)) {
          this.$toasted.error("Only supports upload .xlsx, .xls, .doc, .docx, .pdf, .mp4, .m4v suffix files")
          return false
        }
        this.upload(rawFile)
        e.stopPropagation()
        e.preventDefault()
      },

      async upload(rawFile) {
        this.$refs['upload-input'].value = null // fix can't select the same excel

        let res

        if (!this.beforeUpload) {
          res = await this.addFile(rawFile)
          console.log('res after upload 1: ', res)
        } else {
          const before = this.beforeUpload(rawFile)
          if (before) {
            res = await this.addFile(rawFile)
            console.log('res after upload 2: ', res)
          }
        }
        this.onSuccess && this.onSuccess(res)
      },
      handleDragover(e) {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      },
      handleUpload() {
        this.$refs['upload-input'].click()
      },
      async handleClick(e) {
        const files = e.target.files
        const rawFile = files[0] // only use files[0]
        if (!rawFile) return
        if (!this.isValidFile(rawFile)) {
          this.$toasted.error("Only supports upload .xlsx, .xls, .doc, .docx, .pdf, .mp4, .m4v suffix files")
          return
        }
        await this.upload(rawFile)
      },
      isValidFile(file) {
        if (!this.isValidType(file)) {
          return false
        }
        if (!this.isValidSize(file)) {
          return false
        }
        return true
      },
      isValidType(file) {
        return /\.(png|pdf|mp4|mp3|m4v|doc|docx)$/.test(file.name.toLowerCase())
      },
      isValidSize(file) {
        const isLtSize = file.size / 1024 / 1024 < MAX_UPLOADED_REPOSITORY_FILE_SIZE
        return isLtSize
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/material/_elearning-uploadfile.scss";
</style>