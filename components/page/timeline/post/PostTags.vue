<template>
  <div class="post__tags">
    <span class="text-base font-weight-normal">cùng với</span>

    <n-link :to="`/account/${tags[0].id}`">{{ tags[0].fullname }}</n-link>

    <template v-if="tags.length > 1">
      <span class="text-base font-weight-normal">và</span>
      <n-link
        v-if="tags.length === 2"
        :to="`/account/${tags[1].id}`"
      >{{ tags[1].fullname }}</n-link>

      <app-dropdown v-else>
        <span slot="activator">{{ tags.slice(1).length }} người khác.</span>
        <div
          v-for="item in tags.slice(1)"
          :key="item.id"
          class="px-3 py-2 body-2 font-weight-normal"
          style="white-space: nowrap;"
        >
          <n-link :to="`/account/${item.id}`">{{ item.fullname }}</n-link>
        </div>
      </app-dropdown>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style>
</style>