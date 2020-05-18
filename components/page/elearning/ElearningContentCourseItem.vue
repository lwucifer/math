<template>
    <div>
        <div class="evlc-item__body bg-input-gray">
            <div class="d-flex align-items-center py-3">
            <div class="d-flex align-items-center mr-4">
                <IconPlay class="icon subheading mr-2 fill-primary" />Bài
                {{ lesson.index }}: {{ lesson.name }}
            </div>
            
            <div class="ml-auto">{{ lesson.duration }}</div>
            </div>
            <app-divider class="my-0" />
        </div>
    </div>
</template>

<script>
import IconPlay from '~/assets/svg/icons/play.svg?inline';
export default {
    props: {
        lesson: Object
    },

    components: {
        IconPlay,
    }
}
</script>

<style>

</style>