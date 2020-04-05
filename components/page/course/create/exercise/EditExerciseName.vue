<template>
  <div class="ce-item__left d-flex align-items-center">
    <div class="mr-3">
        <input
            v-if="isEditExerciseName"
            v-model="exerciseNameModel"
            ref="inputExerciserName"
            class="cc-box__input-title bg-input-gray mb-0"
            type="text"
        />
        <h2 class="cc-box__title heading-6" v-else>
            {{ exerciseNameModel }}
        </h2>
    </div>
    <template v-if="isEditExerciseName">
        <button class="cc-box__btn mr-3 text-success" @click="handleSaveExerciseName">Lưu</button>
        <button class="cc-box__btn mr-3 text-gray-2" @click="cancelEditExerciseName">Huỷ</button>
    </template>
    <template v-else>
        <button class="cc-box__btn cc-box__btn-edit" @click="editExerciseName">
            <IconEditAlt class="icon d-block subheading fill-primary"/>
        </button>
    </template>
  </div>
</template>

<script>
import { get } from "lodash";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import { getParamQuery } from "~/utils/common";
import { createPayloadExercise } from "~/models/course/AddCourse";
import * as actionTypes from "~/utils/action-types";
export default {
    components:{
        IconEditAlt,
        IconTrashAlt
    },
    props:{
        exercise: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            isEditExerciseName: false,
            exerciseNameModel:get(this, "exercise.title","")
        }
    },
    watch: {
        exercise: {
        handler: function() {
            this.exerciseNameModel = this.exercise.title;
        },
        deep: true
        }
    },
    methods:{
        get,
        editExerciseName(){
            this.isEditExerciseName = true;
            const timeout = setTimeout(() => {
                this.$refs.inputExerciserName.focus();
                clearTimeout(timeout);
            })
        },
        cancelEditExerciseName(){
            this.isEditExerciseName =false;
            this.exerciseNameModel = this.exercise.title;
        },
        async handleSaveExerciseName(){
            const data = {
                id: get(this,"exercise.id",""),
                title: this.exerciseNameModel
            }
            const payload = createPayloadExercise(data)
            const result = await this.$store.dispatch(
                `elearning/creating/creating-excercises/${actionTypes.ELEARNING_CREATING_EXERCISES.EDIT_PAYLOAD}`,
                payload
            )
            if(get(result, "success", false)){
                this.$toasted.success(get(result, "message", ""));
                this.isEditExerciseName =false;
                this.$emit("handleRefreshExcercises");
                return
            }
            this.$toasted.error(get(result, "message", ""));
        }
    }
}
</script>

<style>

</style>