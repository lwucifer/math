<template>
    <div class="container">
        <AccountCover/>
        <div class="row">
            <div class="col-md-4">
                <AccountSide account="account"/>
            </div>
            <div class="col-md-8">
                <div class="account__main">
                    <ul class="account__tab-nav">
                        <li><n-link :to="'/account'">Timeline</n-link></li>
                        <li><a class="active">Bạn bè</a></li>
                        <li><n-link :to="'/account/photos'">Ảnh</n-link></li>
                    </ul>

                    <div class="tab-content">
                        <AccountFriendsRequests/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AccountFriendsRequests from "~/components/page/account/AccountFriendsRequests";
    import AccountSide from "~/components/page/account/AccountSide";
    import AccountCover from "~/components/page/account/AccountCover";

    export default {
        components: {
            AccountFriendsRequests,
            AccountCover,
            AccountSide
        },

        data() {
            return {
                friends: [
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                {
                    id: 1,
                    name: 'Scarlett Black',
                    mutual_friends: 69,
                    avatar: 'https://picsum.photos/100/100',
                },
                ],
            }
        },

        computed: {
        },

        mounted() {},

        methods: {}
    };
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-friends.scss";
</style>