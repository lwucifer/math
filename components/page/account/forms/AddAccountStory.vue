<template>
  <div>
    <app-editor
      class="mb-4"
      v-model="detail"
    >
    </app-editor>
    <div>
      <app-button
        class="mr-3"
        color="white"
        @click="cancel"
      >
        Hủy
      </app-button>
      <app-button
        @click="submit"
      >
        Thêm tiểu sử
      </app-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      story: {
        type: String,
        default: ''
      }
    },
    computed: {
      detail: function() {
        return this.story
      }
    },
    methods: {
      cancel() {
        console.log('[Cancel create story account]')
      },
      submit() {
        console.log('[Submit create story account]')
      }
    }
  }
</script>

<style scoped>

</style>