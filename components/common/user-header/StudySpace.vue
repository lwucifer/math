<template>
    <div class="wrap-study-space">
        <app-dropdown
            position="left"
            v-model="dropdownCourse"
            :content-width="'20rem'"
            class="link--dropdown link--dropdown-course"
        >
            <n-link slot="activator" to="/elearning/mycourses" class="item">
                Góc học tập
                <IconCaretDown width="10" height="10" />
            </n-link>
            <div class="link--dropdown__content">
                <ul>
                    <li v-for="(elearning,index) in elearningList"
                        :key="index"
                    >
                        <n-link :to="'/elearning/'+ elearning.elearning_id">
                            <div>
                                <div class="d-flex">
                                    <img :src="elearning.avatar.low" class="avatar-elearning__study">
                                    <span class="ml-2 name-elearning__study">{{elearning.name}}</span>
                                </div>
                                <div class="proccess-bar-study-border">
                                    <div class="percent-proccess" v-bind:style="{width: 10 +'%'}"></div>
                                </div>
                                <div>
                                    <span>Đã hoàn thành:</span>
                                    <strong class="color-primary">10%</strong>
                                </div>
                            </div>
                        </n-link>
                    </li>
                    <li class="text-center">
                        <n-link to="/elearning/mycourses">Xem thêm</n-link>
                    </li>
                </ul>
            </div>
        </app-dropdown>
    </div>
</template>

<script>
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
export default {
    data(){
        return{
            dropdownCourse: false,
            elearningList:[]
        }
    },
    components:{
        IconCaretDown
    },
    watch:{
        elearningStudyStudent:{
            handler: function(){
                this.elearningList = get(this,"elearningStudyStudent.data.content",[])
            }
        }
    },
    methods:{
        fetchElearningList(){
            const payload = {
                params :{
                    types: "ALL",
                    size: 3,
                    page: 1
                }
            }
            this.$store.dispatch(`elearning/study/study-student/${actionTypes.ELEARNING_STUDY_STUDENT.LIST}`,payload)
        }
    },
    computed:{
        ...mapState("elearning/study/study-student", {
            elearningStudyStudent: "elearningStudyStudent",
        })
    },
    created(){
        this.fetchElearningList()
    },
}
</script>

<style lang="scss">
.wrap-study-space{
    width: 12rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .item{
        text-decoration: none;
        display: inline-block;
        width: 100%;
        padding: 3rem 0;
        display: block;
        color: #656565;
        svg path{ fill: #656565;}
        &:hover{
            svg path{ fill: $color-primary;}
        }
    }
    .app-dropdown__content{
        left: -50%;
        top: 110%;
        &::after {
        content: "";
        position: absolute;
        bottom: 100%;  /* At the top of the tooltip */
        left: 70%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent white transparent;
        }
            }
    .link--dropdown__content{
        width: 246px;
        .proccess-bar-study-border{
            height: 5px;
            width: 100%;
            background: #EEEEEE;
            margin: 13px 0;
            .percent-proccess{
                background: #37A000;
                height: 5px;
            }
        }
    }
    .avatar-elearning__study{
        width: 62px;
        height: 37px;
    }
    .name-elearning__study{
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
    }
}
</style>