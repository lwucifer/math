<template>
  <div>
    <div class="row">
      <div class="col-6 titleUpload__ElearningManager">
        <span>Upload file</span>
      </div>
      <div class="col-md-6 wrapStorage__ElearningManager ">
        <div class="d-flex justify-content-end">
          <span>Dung lượng đã sử dụng: </span>
          <span> {{ usedCapacity*1024*1024 | fileSizeFilter }}/{{ maxCapacity*1024*1024 | fileSizeFilter }}</span>
        </div>
        <div class="wrapProcessbarStorage__ElearningManager d-flex justify-content-end">
          <div class="processStorage__ElearningManager mb-0">
            <div class="barStorage_ElearningManager mb-0" v-bind:style="{width: capcityPercentage +'%'}"></div>
          </div>
          <span v-if="capcityPercentage || capcityPercentage == 0">{{ capcityPercentage }}%</span>
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
        <div class="upload-alert" v-show="isSuccess || isError">
          <!--Upload fail-->
          <div class="upload-alert--error" v-if="isError">
            <div class="upload-alert--error__info mb-2">
              <div style="line-height: 100%;">
                <IconClose class="icon icon--close-alert" />
              </div>
              <div>
                <span class="upload-alert--error__mess">{{ get(error, 'message', '') }}</span>
              </div>
            </div>

            <div class="upload-alert--error__status">
              {{ get(error, 'reason', '') }}
            </div>
          </div>

          <!--Upload success-->
          <div class="upload-alert--success" v-if="isSuccess">
            <p class="upload-alert--success__title">
              <IconSuccess class="icon"/>
              <span>
                Tải lên thành công
              </span>
            </p>
            <div class="">
              <div class="process--upload">
                <div class="process--upload__percentage" v-bind:style="{width: '100%'}"></div>
              </div>
              <IconCloseOutline class='icon icon-uploading-cancel' title="Hủy"/>
            </div>
            <p class="file-name mb-2">{{ currentFile.name }}</p>
          </div>

          <!--Button continue uploading-->
          <div class="text-center" v-show="isError || isSuccess">
            <app-button
              size="sm"
              square
              color="white"
              class="btn--other-file bg-white"
              @click="uploadOther"
            >
              <IconUploadFile class=""/>
              Tải lên một file khác
            </app-button>
          </div>
        </div>

        <!--Uploading-->
        <div class="py-3" v-if="isUploading">
          <p class="file-name mb-2"><b>{{ currentFile.name }}</b></p>
          <div class="mb-3" style="padding-right: 2.7rem; position: relative">
            <div class="process--upload">
              <div class="process--upload__percentage" v-bind:style="{width: uploadPercentage +'%'}"></div>
            </div>
            <IconCloseOutline class='icon icon-uploading-cancel' title="Hủy" @click="cancelUpload"/>
          </div>
          <p class="process--upload__status">
            <span>{{ uploadPercentage }}</span>% - <span>{{ uploadSpeed }}</span> (<span>{{ this.currentFile.size | fileSizeFilter }}</span>)
          </p>
        </div>

        <!--Drag & drop file-->
        <div class="text-center" v-if="isInitial">
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
  import { fileSizeFilter } from "~/plugins/filters";
  import * as yup from "yup"
  import * as actionTypes from "~/utils/action-types"
  import { MAX_UPLOADED_REPOSITORY_FILE_SIZE } from "~/utils/config"

  const schema = yup.object().shape({
    name: yup.string().required(),
    // file: yup.object().required()
  });

  const STORE_NAMESPACE = 'elearning/teaching/repository-files'
  const DEFAULT_ERROR_MESSAGE = 'Upload tài liệu không thành công'
  const DEFAULT_ERROR_REASON = 'Xảy ra lỗi'

  const STATUS = {
    INITIAL: 0,
    ERROR: 1,
    SUCCESS: 2,
    UPLOADING: 3
  }

  export default {
    data() {
      return {
        payload: {
          file: '',
          name: ''
        },
        error: {
          message: '',
          reason: ''
        },
        currentFile: {},
        uploadPercentage: 0,
        loadedPayload: 0,
        uploadTimestamp: 0,
        diffTimestamp: 1,
        diffPayload: 0,
        currentStatus: 0,
        cancelUploadToken: null
      }
    },
    props: {
      multiple: Boolean,
      beforeUpload: Function, // eslint-disable-line
      onSuccess: Function,// eslint-disable-line,
      maxCapacity: {
        type: Number|String,
        required: true
      },
      usedCapacity: {
        type: Number|String,
        required: true
      }
    },
    components: {
      IconUploadFile,
      IconCloseOutline,
      IconClose,
      IconSuccess
    },
    computed: {
      capcityPercentage() {
        return Math.ceil((this.usedCapacity/this.maxCapacity)*100)
      },
      availableCapcity() {
        return this.maxCapacity - this.usedCapacity
      },
      uploadSpeed: function() {
        return `${Number((this.diffPayload / this.diffTimestamp).toFixed(1))} KB/s`
      },
      isInitial: function () {
        return this.currentStatus == STATUS['INITIAL']
      },
      isError: function () {
        return this.currentStatus == STATUS['ERROR']
      },
      isSuccess: function () {
        return this.currentStatus == STATUS['SUCCESS']
      },
      isUploading: function () {
        return this.currentStatus == STATUS['UPLOADING']
      }
    },
    watch: {
      uploadPercentage: function(newVal, oldVal) {
      },
      uploadTimestamp: function(newVal, oldVal) {
        this.diffTimestamp = newVal - oldVal
      },
      loadedPayload: function(newVal, oldVal) {
        this.diffPayload = newVal - oldVal
      }
    },
    methods: {
      async addFile(rawFile) {
        this.payload.name = rawFile.name
        this.payload.file = rawFile

        this.currentFile.name = rawFile.name
        this.currentFile.size = rawFile.size

        const modelData = createPayloadAddRepository(this.payload)

        const payload = new FormData();
        for (const key in modelData) {
          payload.append(key, modelData[key]);
        }

        const CancelToken = this.$axios.CancelToken;

        let config = {
          onUploadProgress: progressEvent => {
            this.uploadPercentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            this.loadedPayload = progressEvent.loaded
            this.uploadTimestamp = progressEvent.timeStamp
          },
          cancelToken: new CancelToken( cancel => {
            this.cancelUploadToken = cancel
          }),
        }

        const res = await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.ADD}`,
          { payload, config }
        );
        return res;
      },
      async validateAddFile(data) {
        const isValid = await schema.isValid(data)
        return isValid
      },
      handleDrop(e) {
        e.stopPropagation()
        e.preventDefault()
        if (this.loading) return

        const files = e.dataTransfer.files

        if (files.length !== 1) {
          this.hasError(DEFAULT_ERROR_MESSAGE, 'Chỉ cho phép tải một file tại một thời điểm!')
          return
        }

        const rawFile = files[0] // only use files[0]
        if (!this.isValidFile(rawFile)) {
          return false
        }
        this.upload(rawFile)
        e.stopPropagation()
        e.preventDefault()
      },

      async upload(rawFile) {
        this.currentStatus = STATUS['UPLOADING']
        this.$refs['upload-input'].value = null // fix can't select the same excel

        let res

        if (!this.beforeUpload) {
          res = await this.addFile(rawFile)
        } else {
          const before = this.beforeUpload(rawFile)
          if (before) {
            res = await this.addFile(rawFile)
          }
        }
        if (res && get(res, 'success', false)) {
          this.currentStatus = STATUS['SUCCESS']
          this.onSuccess && this.onSuccess(res)
        } else {
          let reason = res && get(data, "message", false) ? get(data, "message") : DEFAULT_ERROR_REASON
          this.hasError(DEFAULT_ERROR_MESSAGE, reason)
        }

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
          return
        }
        await this.upload(rawFile)
      },
      isValidFile(file) {
        if (!this.isValidType(file)) {
          this.hasError(DEFAULT_ERROR_MESSAGE, 'Chỉ cho phép tải các file có phần mở rộng .doc, .docx, .pdf, .mp3, .mp4, .m4v, .png')
          return false
        }
        if (!this.isValidSize(file)) {
          this.hasError(DEFAULT_ERROR_MESSAGE, `Dung lượng tài liệu vượt quá giới hạn > ${fileSizeFilter(MAX_UPLOADED_REPOSITORY_FILE_SIZE*1024*1024)}`)
          return false
        }
        if (!this.isAvailableStorage(file)) {
          this.hasError(DEFAULT_ERROR_MESSAGE, `Kho học liệu của bạn không đủ dung lượng trống để tải file`)
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
      },
      isAvailableStorage(file) {
        const fileSize = file.size
        return this.availableCapcity * 1024 * 1024 > fileSize
      },
      cancelUpload() {
        if (this.isUploading) {
          this.cancelUploadToken('Cancel upload file')
          this.resetUpload()
        }
      },
      resetUpload() {
        this.currentStatus = STATUS['INITIAL']
        this.currentFile = {}
      },
      uploadOther() {
        this.resetUpload()
      },
      hasError(message, reason) {
        this.currentStatus = STATUS['ERROR']
        this.error = {
          message: message,
          reason: reason
        }
      },
      get
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/material/_elearning-uploadfile.scss";
</style>