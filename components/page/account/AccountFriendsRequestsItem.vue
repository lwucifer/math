<template>
    <div class="account-friends-item">
        <div class="account-friends-item__info">
            <app-avatar :src="data.avatar" :size="100"/>
            <div>
                <strong>{{ data.name }}</strong>
                <p>{{ data.mutual_friends }} bạn chung</p>
            </div>
        </div>

        <div class="account-friends-item__actions ml-auto">
            <app-button square size="xs" class="d-block" fullWidth>
                Đồng ý
            </app-button>
            <app-button square size="xs" color="secondary" class="d-block mt-3" fullWidth>
                Từ chối
            </app-button>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },

        props: {
            data: {
                type: Object,
                required: true,
                default: () => {}
            },
        },

        data() {
            return {
                dropdownShow: false,
            }
        },

        methods: {
        },

    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/account/_account-friends-item.scss";
</style>