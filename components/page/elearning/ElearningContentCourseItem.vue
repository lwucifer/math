<template>
    <div>
        <div class="evlc-item__body bg-input-gray">
            <div class="d-flex align-items-center py-3">
            <div class="d-flex align-items-center mr-4">
                <IconLibraryBooks class="fill-primary mr-2" v-if="lesson.format == 'DOCX'"/>

                <IconPlay v-else class="icon subheading mr-2 fill-primary" />
                Bài {{ lesson.index }}: {{ lesson.name }}
            </div>
            
            <div class="ml-auto">{{ lesson.duration }}</div>
            </div>
            <app-divider class="my-0" />
        </div>
    </div>
</template>

<script>
import IconPlay from '~/assets/svg/icons/play.svg?inline';
import IconLibraryBooks from '~/assets/svg/icons/library-books.svg?inline';
export default {
    props: {
        lesson: Object
    },

    components: {
        IconPlay,
        IconLibraryBooks
    }
}
</script>

<style>

</style>