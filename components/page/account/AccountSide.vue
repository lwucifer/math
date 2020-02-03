<template>
    <div class="account__side">
        <div class="account__side-item info">
            <h3>Giới thiệu</h3>
            <table>
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
            </table>
            <app-button square fullWidth>Chỉnh sửa thông tin</app-button>
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
            <app-button square fullWidth>Xem toàn bộ ảnh</app-button>
        </div>

        <div class="account__side-item friends">
            <h3>Bạn bè <span>268</span></h3>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                    <strong>Regina Edwards</strong>
                </div>
                <div class="col-md-4 mb-3">
                    <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                    <strong>Regina Edwards</strong>
                </div>
                <div class="col-md-4 mb-3">
                    <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                    <strong>Regina Edwards</strong>
                </div>
                <div class="col-md-4 mb-3">
                    <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                    <strong>Regina Edwards</strong>
                </div>
                <div class="col-md-4 mb-3">
                    <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                    <strong>Regina Edwards</strong>
                </div>
                <div class="col-md-4 mb-3">
                    <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                    <strong>Regina Edwards</strong>
                </div>
            </div>
            <app-button square fullWidth>Tất cả bạn bè</app-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "E-learning",

        components: {},

        props: {
            acount: {
                type: Object,
                required: true,
                default: () => {}
            }
        }
    };
</script>

<style>
    @import "~/assets/scss/components/elearning/_elearning-side.scss";
</style>