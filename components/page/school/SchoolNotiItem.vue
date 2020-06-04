<template>
    <div class="school-noti-item">
        <div class="school-noti-item__img">
            <img src="~assets/images/school/email-2.png" alt="">
        </div>

        <div class="school-noti-item__content">
            <div class="text">{{ data.noti_title }}</div>
            <div class="date">{{ data.date }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_school-noti-item.scss";
</style>