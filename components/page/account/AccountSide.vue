<template>
    <div class="account__side">
        <div class="account__side-item info">
            <h3>Giới thiệu</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>hello@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Số điện thoại</td>
                        <td>0988777999</td>
                    </tr>
                    <tr>
                        <td>Ngày sinh</td>
                        <td>06/09/1996</td>
                    </tr>
                    <tr>
                        <td>Giới tính</td>
                        <td>Nam</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ</td>
                        <td>10 Lê Văn Lương</td>
                    </tr>
                </tbody>
            </table>

            <app-button square fullWidth @click="showEdit = true">Chỉnh sửa thông tin</app-button>
            <AccountEditModal :visible="showEdit" @click-close="showEdit = false" 
            :account="account"/>

            <app-button square fullWidth @click="showChangePass = true">Đổi mật khẩu</app-button>
            <AccountChangePasswordModal :visible="showChangePass" 
            @click-close="showChangePass = false" 
            :account="account"/>
        </div>

        <div class="account__side-item photos">
            <h3>Ảnh</h3>
            <div class="row m-0">
                <div class="col-md-4 p-0">
                    <img src="https://picsum.photos/110/110">
                </div>
                <div class="col-md-4 p-0">
                    <img src="https://picsum.photos/110/110">
                </div>
                <div class="col-md-4 p-0">
                    <img src="https://picsum.photos/110/110">
                </div>
                <div class="col-md-4 p-0">
                    <img src="https://picsum.photos/110/110">
                </div>
                <div class="col-md-4 p-0">
                    <img src="https://picsum.photos/110/110">
                </div>
                <div class="col-md-4 p-0">
                    <img src="https://picsum.photos/110/110">
                </div>
            </div>
            <n-link class="btn btn--size-md btn--full-width btn--color-primary btn--square"
            :to="'/account/photos'">
            Xem toàn bộ ảnh
        </n-link>
        </div>

        <div class="account__side-item friends">
            <h3>Bạn bè <span>268</span></h3>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <n-link :to="'/account/1'">
                        <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                        <strong>Regina Edwards</strong>
                    </n-link>
                </div>
                <div class="col-md-4 mb-3">
                    <n-link :to="'/account/1'">
                        <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                        <strong>Regina Edwards</strong>
                    </n-link>
                </div>
                <div class="col-md-4 mb-3">
                    <n-link :to="'/account/1'">
                        <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                        <strong>Regina Edwards</strong>
                    </n-link>
                </div>
                <div class="col-md-4 mb-3">
                    <n-link :to="'/account/1'">
                        <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                        <strong>Regina Edwards</strong>
                    </n-link>
                </div>
                <div class="col-md-4 mb-3">
                    <n-link :to="'/account/1'">
                        <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                        <strong>Regina Edwards</strong>
                    </n-link>
                </div>
                <div class="col-md-4 mb-3">
                    <n-link :to="'/account/1'">
                        <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                        <strong>Regina Edwards</strong>
                    </n-link>
                </div>
            </div>
            <n-link class="mt-0 btn btn--size-md btn--full-width btn--color-primary btn--square"
            :to="'/account/friends'">
            Tất cả bạn bè
        </n-link>
    </div>
</div>
</template>

<script>
    import AccountEditModal from "~/components/page/account/AccountEditModal";
    import AccountChangePasswordModal from "~/components/page/account/AccountChangePasswordModal";

    export default {
        name: "E-learning",

        components: {
            AccountEditModal,
            AccountChangePasswordModal
        },

        props: {
            // account: {
            //     type: Object,
            //     required: true,
            //     default: () => {}
            // }
        },

        data: () => ({
            showEdit: false,
            showChangePass: false,
            account: {
                id: '1',
                name: 'Master King',
                phone: '0988666999',
                email: 'hello@gmail.com',
                address: '10 Lê Văn Lương',
                sex: 1,
                birthday: '06/09/1996',
            },
        })
    };
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-side.scss";
</style>