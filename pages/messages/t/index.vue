<template>
  <!-- <div class="page-message">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sidebar">
          <TabContact :contacts="[]" :friends="[]" />
        </div>
  <div class="col-md-9 col-content">-->
  <div class="box">
    <div class="row">
      <TabMessage :isCreated="isCreate" />
      <!-- <TabInfo :isGroup="isGroup" :noMessage="true" /> -->
    </div>
  </div>
  <!-- </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import * as actionTypes from "~/utils/action-types";
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconImage from "~/assets/svg/icons/image.svg?inline";
import TabContact from "~/components/page/chat/TabContact";
import TabMessage from "~/components/page/chat/TabMessage";
// import TabInfo from "~/components/page/chat/TabInfo";

import * as constants from "~/utils/constants";
import { redirectWithParams } from "../../../utils/common";

import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    Logo,
    IconCaretDown,
    IconImage,
    TabMessage,
    TabContact
    // TabInfo
  },

  middleware: "authenticated",
  async fetch({ params, query, store, redirect }) {
    const data = await store.dispatch(`chat/${actionTypes.CHAT.ROOM_LIST}`);
    const dataRooms = data.list_room ? data.list_room : [];
    console.log("dataRooms", dataRooms);
    const id = dataRooms[0] ? dataRooms[0].room_id : "";
    if (id) {
      return redirect(`/messages/t/${id}`);
    } else {
      return false;
    }
  },
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    isGroup: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_page_messages.scss";
</style>