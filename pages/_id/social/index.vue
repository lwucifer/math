<template></template>

<script>
export default {
  middleware({ store, route, redirect }) {
    return redirect(`/${route.params.id}/social/friends`);
  }
};
</script>

<style>
</style>