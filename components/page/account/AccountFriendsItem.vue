<template>
    <div class="account-friends-item">
        <div class="account-friends-item__info">
            <n-link :to="'/account/1'">
                <app-avatar :src="data.avatar" :size="100"/>
            </n-link>
            <div>
                <n-link :to="'/account/1'" class="bold link-dark">
                    {{ data.name }}
                </n-link>
                <p>{{ data.mutual_friends }} bạn chung</p>
            </div>
        </div>

        <app-dropdown class="account-friends-item__actions ml-auto" align-content="center"open-on-click v-model="dropdownShow" content-width="150px">
            <app-button slot="activator" color="secondary" square size="xs">
                <IconTickGray class="mr-2"/> Bạn bè
            </app-button>
            <ul class="account-friends-item__actions-list">
                <li>
                    <a>
                        Hủy theo dõi
                    </a>
                </li>
                <li>
                    <a>
                        Hủy kết bạn
                    </a>
                </li>
            </ul>
        </app-dropdown>
    </div>
</template>

<script>
    import IconTickGray from '~/assets/svg/icons/tick-gray.svg?inline';
    

    export default {
        components: {
            IconTickGray,
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