<template>
    <div>
        <p class="text-gray font-weight-normal">Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia</p>
        <div class="ml-4">
            <p>Hình thức nhận thông báo</p>
            <div class="icon-title__account-info">
                <IconDatabase/>
                <span class="ml-2">Thông báo đầy</span>
            <app-toggle-switch class="ml-auto"></app-toggle-switch>
            </div>
            <div class="icon-title__account-info">
                <IconEnvelope/>
                <span class="ml-2">Email</span>
                <app-toggle-switch class="ml-auto" :checked="false"></app-toggle-switch>
            </div>
        </div>
    </div>
</template>

<script>
import IconDatabase from '~/assets/svg/design-icons/database.svg?inline';
import IconEnvelope from '~/assets/svg/design-icons/envelope-alt.svg?inline';
export default {
    components:{
        IconDatabase,
        IconEnvelope
    }
}
</script>

<style>

</style>