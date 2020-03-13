<template>
  <div class="page-message">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sidebar">
          <TabContact :contacts="contactList" />
        </div>
        <div class="col-md-9 col-content">
          <div class="box">
            <div class="row">
              <TabMessage />
              <TabInfo :fileshare="fileShareList" :imageshare="imageShareList" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

  data() {
    return {
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
        },
      ]
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_page_messages.scss";
</style>