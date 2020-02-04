<template>
    <app-modal
    centered
    :width="606"
    :component-class="{ 'account-edit-modal': true }"
    @close="$router.push('/')"
    v-if="visible"
    >
        <div slot="content" >
            <div v-if="success" class="change-pass-success text-center">
                <h2 class="color-primary">Thành công</h2>
                <div class="icon-tick mt-3 mb-3">
                    <IconTick/>
                </div>
                <p>Chúc mừng bạn đã thay đổi mật khẩu thành công</p>
                <div class="text-center mt-4">
                    <app-button size="lg" color="info" square @click="$emit('click-close')">
                        Đóng
                    </app-button>
                </div>
            </div>

            <div v-else>
                <h3>Thay đổi mật khẩu</h3>
                <div class="form-group">
                    <label class="w-150 bold">Mật khẩu hiện tại</label>
                    <input type="password" v-model="oldPassword" class="form-control" 
                    :class="error ? 'form-control-error' : ''"/>
                    <i v-if="error" class="error pl-16">Mật khẩu phải có từ 8-32 ký tự</i>
                </div>
                <div class="form-group">
                    <label class="w-150 bold">Mật khẩu mới</label>
                    <input type="password" v-model="newPassword" class="form-control"
                    :class="error2 ? 'form-control-error' : ''"/>
                    <i v-if="error2" class="error pl-16">Mật khẩu phải có từ 8-32 ký tự</i>
                </div>
                <div class="form-group">
                    <label class="w-150 bold">Xác nhận mật khẩu</label>
                    <input type="password" v-model="coNewPassword" class="form-control"
                    :class="error3 ? 'form-control-error' : ''"/>
                    <i v-if="error3" class="error pl-16">Mật khẩu phải có từ 8-32 ký tự</i>
                </div>
                <div class="text-center">
                    <app-button size="lg" color="info" class="mr-3" square @click="$emit('click-close')">
                        Hủy bỏ
                    </app-button>
                    <app-button size="xl" square @click="save()">Xác nhận</app-button>
                </div>
            </div>
        </div>
    </app-modal>
</template>

<script>
    import IconTick from '~/assets/svg/icons/tick.svg?inline';

    export default {
        components: {
            IconTick
        },
        props: {
            visible: Boolean,
            account: {
                type: Object,
                required: true,
                default: () => {}
            }
        },
        computed : {
        },
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                coNewPassword: '',
                error: false,
                error2: false,
                error3: false,
                success: false,
            }
        },
        methods: {
            save() {
                const that = this;
                that.error = (that.oldPassword.length < 8 || that.oldPassword.length > 32);
                that.error2 = (that.newPassword.length < 8 || that.newPassword.length > 32);
                that.error3 = (that.coNewPassword.length < 8 || that.coNewPassword.length > 32);
                if (!that.error && !that.error2 && !that.error3) {
                    that.success = true;
                }
            },
            reset() {
                const that = this;
                that.oldPassword = '',
                that.newPassword = '',
                that.coNewPassword = '',
                that.error = false;
                that.error2 = false;
                that.error3 = false;
                that.success = false;
            }
        },

        watch: {
            visible() {
                this.reset();
            }
        }
    }
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-edit-modal.scss";
</style>