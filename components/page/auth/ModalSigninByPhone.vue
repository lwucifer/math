<template>
    <app-modal
        centered
        :width="306"
        :component-class="{ 'auth-modal': true }"
        @close="$router.push('/')"
        v-if="visible"
    >
        <h3 class="color-primary" slot="header">
            Đăng nhập
            <a class="btn-close" @click="$emit('click-close')">X</a>
        </h3>

        <div slot="content">
            <!--Step 3-->
            <div class="form-group" v-if="step === 3">
                <input type="text" v-model="otp" class="form-control ml-0" placeholder="Nhập mã OTP"/>
            </div>
            <div class="form-group" v-if="step === 3">
                <IconLock  width="13" height="23"/>
                <input type="password" v-model="newpassword" class="form-control" placeholder="Mật khẩu mới"/>
            </div>

            <!--Step 2-->
            <div class="form-group" v-if="step === 2">
                <IconLock  width="13" height="23"/>
                <input type="password" v-model="password" class="form-control" placeholder="Mật khẩu"/>
            </div>

            <!--Step 1-->
            <div class="form-group" v-if="step === 1">
                <IconPhone  width="11" height="28"/>
                <app-select class="phone-select" :options="areaCodes" v-model="areaCode"/>
                <input type="text" maxlength="20" v-model="phone" class="form-control" placeholder="Số điện thoại"/>
            </div>
            <i class="danger" v-if="phoneError">Số điện thoại tối đa 10 ký tự</i>

            <app-button color="primary" square fullWidth @click="nextlogin">{{ step === 1 ? 'Tiếp tục' : 'Đăng nhập' }}</app-button>
            <a class="color-primary" @click="forgot"  v-if="step === 2">
                Quên mật khẩu?
            </a>
            <a class="color-primary" @click="resendOTP" v-if="step === 3" :class="countDown > 0 ? 'disabled' : ''">
                Gửi lại mã xác thực <span>({{countDown}}s)</span>
            </a>
        </div>
    </app-modal>
</template>

<script>
    import IconPhone from "~/assets/svg/icons/phone.svg?inline";
    import IconLock from "~/assets/svg/icons/lock.svg?inline";
    import * as actionTypes from "../../../utils/action-types";

    export default {
        components: {
            IconPhone,
            IconLock
        },
        props: {
            visible: Boolean
        },
        data() {
            return {
                step: 1,
                areaCodes: [
                    {value: '+84', text:'+84'},
                    {value: '+83', text:'+83'},
                    {value: '+82', text:'+82'},
                ],
                areaCode: '+84',
                phone: '',
                otp: '',
                password: '',
                newpassword: '',
                countDownDefault: 120,
                countDown: 120,
                phoneError: false
            }
        },
        methods: {
            nextlogin() {
                if (this.step === 2) {
                    let data = {
                        email: this.areaCode + this.phone,
                        password: this.password
                    };
                    this.$store.dispatch(actionTypes.AUTH.LOGIN, data);
                }
                if (this.step === 1) {
                    if (this.phone.length > 10) {
                        this.phoneError = true;
                    } else {
                        this.phoneError = false;
                        this.step = 2;
                    }
                }
            },
            forgot() {
                this.step = 3;
                this.sendOTP();
            },
            resendOTP() {
                if(this.countDown === 0) {
                    this.countDown = this.countDownDefault;
                    this.sendOTP();
                }
            },
            sendOTP() {
                this.countDownTimer();
            },
            countDownTimer() {
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
            },
        }
    }
</script>

<style>

</style>