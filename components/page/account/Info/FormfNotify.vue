<template>
    <div class="form-dropdown">
        <!--<div class="d-flex">-->
        <div class="form-dropdown__title">
            <p class="fd__title-main">{{ notify.title }}</p>
            <p class="fd__title-des">{{handleNotify()}}</p>
            <button class="form-dropdown__indicator" @click.prevent="showFormNotify=!showFormNotify">
                <IconCaretUp class="icon" v-if="showFormNotify"/>
                <IconCaretDown class="icon" v-else/>
            </button>
        </div>
        <div v-show="showFormNotify" class="form-dropdown__expand">
            <p class="fd__title-des mb-4">{{ notify.describe }}</p>
            <div class="ml-4">
                <p class="fd__title-main">Hình thức nhận thông báo</p>
                <div class="icon-title__account-info">
                    <IconDatabase/>
                    <span class="">Thông báo đầy</span>
                    <app-toggle-switch
                        class="ml-auto"
                        :value="'Thông báo đầy'"
                        :checked="checkNotify"
                        @change="handleChange"
                    />
                </div>
                <div class="icon-title__account-info">
                    <IconEnvelope/>
                    <span class="">Email</span>
                    <app-toggle-switch
                        class="ml-auto"
                        :value="'Email'"
                        :checked="checkEmail"
                        @change="handleChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconDatabase from '~/assets/svg/design-icons/database.svg?inline';
import IconEnvelope from '~/assets/svg/design-icons/envelope-alt.svg?inline';
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconCaretUp from "~/assets/svg/icons/caret-up.svg?inline";
import { get, map } from "lodash";
export default {
    components:{
        IconDatabase,
        IconEnvelope,
        IconCaretDown,
        IconCaretUp
    },
    props:{
        notify:{
            type: Object,
            default: null,
        }
    },
    data(){
        return{
            showFormNotify:false,
            checkEmail:false,
            checkNotify:false,
            typeNotifies:[]
        }
    },
    methods:{
        handleChange(e){
            if(e.check){
                this.typeNotifies.push(e.value)
            }
            else{
                this.typeNotifies = this.typeNotifies.filter(f => f !==e.value)
            }
        },
        handleNotify(){
            const test = map(this.typeNotifies).join(', ')
            return test ? test : "Tắt";
        }
    }
}
</script>

<style>

</style>