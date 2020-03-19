<template></template>

<script>
import * as actionTypes from "~/utils/action-types";
import { redirectWithParams } from "../../utils/common";
export default {
  async fetch({ params, query, store }) {
    await Promise.all([
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.GROUP_LIST}`)
    ]);
  },
  mounted() {
    const dataRooms = this.$store.state.message.groupList.rooms;
    const id = dataRooms.filter(item => item.type == 1)[0].id;
    const url = `/message/${id}`;
    this.$router.push(url);
  }
};
</script>

<style>
</style>