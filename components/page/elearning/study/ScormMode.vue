<template>
  <div class="es-scorm-mode">
    <iframe
      class="es-scorm-mode__iframe"
      src="https://s3.cloud.cmctelecom.vn/dev-elearning-schoolly/scorm/20200610034529203_c2f56f5d1c170e0a9723d5bf2b149d67ecb42aee71513e8f3ca4013b236f82fd/Tin%20hoc%206_repair/index.htm"
    ></iframe>

    <nav class="es-scorm-mode__menu">
      <h3 class="es-scorm-mode__heading">
        <button class="es-scorm-mode__button"></button>
        <span class="es-scorm-mode__title">Danh mục</span>
      </h3>

      <ul class="es-scorm-mode__menu-list">
        <li><a href="">Tên bài học 1</a></li>
        <li><a href="">Tên bài học 2</a></li>
        <li><a href="">Tên bài học 3</a></li>
        <li><a href="">Tên bài học 4</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_scorm-mode.scss";
</style>