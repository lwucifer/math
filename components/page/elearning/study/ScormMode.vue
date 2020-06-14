<template>
  <div class="es-scorm-mode">
    <iframe
      class="es-scorm-mode__iframe"
      :src="activeLink"
    ></iframe>

    <nav class="es-scorm-mode__menu" :class="{ show: showMenu }">
      <h3 class="es-scorm-mode__heading" @click="showMenu = !showMenu">
        <button class="es-scorm-mode__button">
          <IconViewAgenda class="icon fill-opacity-1" />
        </button>
        <span class="es-scorm-mode__title">Danh mục</span>
      </h3>

      <ul class="es-scorm-mode__menu-list">
        <li v-for="(item, index) in scormItems" :key="index"><a @click="setLink(item)">Tên bài học 1</a></li>
        <!-- <li><a href="" class="active">Tên bài học 2</a></li>
        <li><a href="">Tên bài học 3</a></li>
        <li><a href="">Tên bài học 4</a></li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
import IconViewAgenda from "~/assets/svg/v2-icons/view_agenda_24px.svg?inline";
import { mapState } from "vuex";

export default {
  components: {
    IconViewAgenda
  },

  data() {
    return {
      showMenu: false,
      activeLink: "#",
    };
  },

  computed: {
    ...mapState("elearning/study/study", ["scormItems"])
  },

  methods: {
    setLink(_link) {
      this.activeLink = _link;
    }
  }

};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_scorm-mode.scss";
</style>
