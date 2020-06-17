<template>
  <app-modal
    centered
    :width="600"
    :component-class="{ 'invite-student-modal': true }"
    :footer="false"
    title="Xem câu hỏi và câu trả lời"
    @close="close(false)"
  >
    <div slot="content" class="px-3">
        <div class="d-flex my-2">
            <app-avatar class="mr-2" :size="40" v-lazy="'https://picsum.photos/40/40'"/>
            <div>
                <p class="text-dark">{{get(question,"student_name",'')}}</p>
                <p class="text-gray-3">15/10/2020</p>
            </div>
        </div>
        <span>{{get(question,"content",'')}}</span>
        <hr class="mt-3"/>
        <div class="mt-5">
            <div class="d-flex mb-5" v-for="(item,index) in  get(this,'question.content','')" :key="index">
                <app-avatar class="mr-2" :size="40" :src="get(item,'creator_avatar','')"/>
                <div>
                    <p class="text-dark">{{item.creator_name}}</p>
                    <p class="text-gray-3">{{get(item,'timestamp','') | moment('DD/MM/YYYY')}}</p>
                    <p v-html="get(item,'content','')"></p>
                </div>
            </div>
        </div>
        <app-input
            textarea
            placeholder="Viết câu trả lời"
            v-model="payload.content"
        />
        <div class="text-center">
            <app-button
                color="white"
                class="mr-4"
                @click.prevent="close(false)"
            >
                Hủy
            </app-button>
            <app-button

                @click.prevent="submitAnswer"
            >
                Gửi câu trả lời
            </app-button>
        </div>
    </div>
  </app-modal>
</template>

<script>
import {get} from 'lodash'
import { mapState, mapActions } from "vuex";
import * as actionTypes from "~/utils/action-types";
const STORE_NAME_ANSWERS = "elearning/teaching/interactive-answer";
import { createInteractAnswer } from "~/models/elearning/Interacts";
import InteractiveAddAnswer from "~/services/elearning/teaching/InteractiveAnswer";
export default {
    props:{
        question:{
            type: Object,
            default: ()=>{}
        }
    },
    data(){
        return{
            question_id: get(this,"question.question_id",''),
            payload: {
                content: "",
                question_id: get(this,"question.question_id",''),
            },
        }
    },
    computed:{
        ...mapState(STORE_NAME_ANSWERS, ["listAnswers"])
    },
    methods:{
        ...mapActions(STORE_NAME_ANSWERS, ["teachingInteractiveListqAnswer","teachingInteractiveAnswer"]),
        close(invite) {
            this.$emit("close", invite);
        },
        fetchListAnswer(){
            const query = {
                params: {
                    question_id: this.question_id
                    }
            };
            this.teachingInteractiveListqAnswer(query)
        },
        async submitAnswer(){
            const payload = createInteractAnswer(this.payload)
            console.log('hello',payload)
            const res = await new InteractiveAddAnswer(this.$axios)["addAnswerOfAnswer"](
                this.payload
            );
            if (get(res, "success", false)) {
                this.$toasted.success("Thành công");
                this.payload.content = '';
                this.fetchListAnswer();
                return
            }
            this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
            
        },
        get
    },
    created(){
        this.fetchListAnswer();
    }
}
</script>

<style>

</style>