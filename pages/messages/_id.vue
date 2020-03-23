<template>
  <div class="page-message">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sidebar">
          <TabContact :contacts="contactList" :friends="friends" @addMessage="addMessage()" @clickTab="clickTab()"/>
        </div>
        <div class="col-md-9 col-content">
          <div class="box">
            <div class="row">
              <TabMessage :isCreate="isCreate" />
              <TabInfo :fileshare="fileShareList" :imageshare="imageShareList" :members="friends" :isGroup="isGroup"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import socket from "~/plugins/socket.io.js";

import * as actionTypes from "~/utils/action-types";
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconImage from "~/assets/svg/icons/image.svg?inline";
import TabContact from "~/components/page/chat/TabContact";
import TabMessage from "~/components/page/chat/TabMessage";
import TabInfo from "~/components/page/chat/TabInfo";

export default {
  components: {
    Logo,
    IconCaretDown,
    IconImage,
    TabMessage,
    TabContact,
    TabInfo
  },

  async fetch({ params, query, store, route }) {
    const userId = store.state.auth.token ? store.state.auth.token.id : "";
    const room_id =
      // 18;
      route.params.id;
    // let listQuery = {
    //   page: 1,
    //   perPage: 10,
    //   user_id: 31
    // };
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_FRIEND.LIST}`, {
        params: {
          user_id: userId
        }
      }),
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.GROUP_LIST}`),
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.MESSAGE_LIST}`, {
        params: {
          room_id: room_id
        }
      }),
      store.dispatch(`message/${actionTypes.MESSAGE_GROUP.MEMBER_LIST}`, {
        params: {
          room_id: room_id
        }
      })
    ]);
  },

  data() {
    return {
      isGroup: false,
      contactList: [
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        },
        {
          image: "https://picsum.photos/40/40",
          title: "Arlene Henry",
          desc: "Lorem ipsum dolor sit amet"
        }
      ],
      fileShareList: [
        {
          link: "#",
          title: "IrmaRussell_1.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        },
        {
          link: "#",
          title: "IrmaRussell.zip"
        }
      ],
      imageShareList: [
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        },
        {
          link: "#",
          image: "https://i.picsum.photos/id/13/80/80.jpg"
        }
      ],
      friends: [
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        }
      ],
      isCreate: false
    };
  },

  mounted() {
    // Connect socket
    // if (!socket.connected) {
    //   socket.connect();
    // }
    // Emit socket event
    // socket.emit("join_resource", { data: "I'm connected!" });
  },

  methods: {
    addMessage() {
      this.isCreate = !this.isCreate;
    },
    
    clickTab() {
      this.isGroup = !this.isGroup;
    },
  },

  beforeDestroy() {
    // socket.off('resource');
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_page_messages.scss";
</style>