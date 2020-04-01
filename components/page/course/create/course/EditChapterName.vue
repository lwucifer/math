<template>
    <div class="ce-item__left d-flex align-items-center">
        <div class="mr-3">
          Chương {{ this.defaultName.index + 1 }}:
          <input
            v-if="isEditChaperName"
            v-model="chaperNameModel"
            ref="inputChaperName"
            class="cc-box__input-title bg-input-gray mb-0"
            type="text"
          />

          <h3 v-else class="d-inline-block body-2 mr-3">
            <span class="font-weight-normal">{{ this.defaultName.name }}</span>
          </h3>
        </div>

        <template v-if="isEditChaperName">
          <button class="cc-box__btn mr-3 text-success" @click="handleEditChaperName">Lưu</button>
          <button class="cc-box__btn mr-3 text-gray-2" @click="cancelEditChapterName">Huỷ</button>
        </template>

        <template v-else>
          <a href class="ce-item__action edit mr-3" @click.prevent="editChaperName">
            <IconEditAlt class="icon d-block subheading fill-primary" />
          </a>

          <a href class="ce-item__action delete mr-3" @click.prevent="handleDeleteChapter">
            <IconTrashAlt class="icon d-block subheading fill-secondary" />
          </a>
        </template>
        <app-modal-confirm
            v-if="showModalConfirm"
            :confirmLoading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancelModal"
            />
      </div>
</template>

<script>
import { string } from 'yup'
import { get, toNumber } from "lodash";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import { useEffect, getParamQuery } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import { createPayloadAddContentCourse } from "~/models/course/AddCourse";
export default {
    components:{
        IconEditAlt,
        IconTrashAlt
    },
    props:{
        defaultName : {
            type: Object, 
            default: null
        }
    },
    data(){
        return{
            chaperNameModel: "",
            isEditChaperName: false,
            showModalConfirm: false,
            confirmLoading: false,
        }
    },
    created(){
        useEffect(this, this.handleChangeDefaultName.bind(this),["defaultName"])
    },
    methods:{
        handleChangeDefaultName(){
            this.chaperNameModel = this.defaultName.name
        },
        async handleDeleteChapter(){
            this.showModalConfirm = true
        },
        async handleCancelModal(){
            this.showModalConfirm = false;
            this.confirmLoading = false;
        },
        async handleOk() {
            this.confirmLoading = true;
            const payload = {
                data: {
                id: get(this, "defaultName.id", "")
                }
            };
            const res = await this.$store.dispatch(
                `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.DELETE}`,
                payload
            );

            this.handleCancelModal();

            if (get(res, "success", false)) {
                this.$emit("handleRefreshChapters");
                this.$toasted.success(get(res, "message", "success"));
                return;
            }
            this.$toasted.error(get(res, "message", "error"));
            },
            editChaperName() {
                this.isEditChaperName = true;
                const timeout = setTimeout(() => {
                    this.$refs.inputChaperName.focus();
                    clearTimeout(timeout);
                });
            },
            cancelEditChapterName(){
                this.isEditChaperName = false
            },
            async handleEditChaperName(){
                const data = {
                    id: get(this, "defaultName.id", ""),
                    name: this.chaperNameModel
                };
                const payload = createPayloadAddContentCourse(data);
                const result = await this.$store.dispatch(
                    `elearning/creating/creating-chapter/${actionTypes.ELEARNING_CREATING_CHAPTER.EDIT}`,
                    payload
                )
                if(get(result,"success",false)){
                    this.$emit("handleRefreshChapters");
                    this.$toasted.success(get(result,"message",""))
                    this.isEditChaperName = false
                }
                else{
                    this.$toasted.error(get(result, "message", "error"));
                }
            }
    },
    
}
</script>

<style>

</style>