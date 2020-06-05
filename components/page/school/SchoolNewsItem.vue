<template>
    <div class="school-news-item">
        <div class="school-news-item__text">
            <div class="date">{{ data.date }}</div>

            <n-link to="" class="title">{{ data.title }}</n-link>
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
@import "~assets/scss/components/school/_school-news-item.scss";
</style>