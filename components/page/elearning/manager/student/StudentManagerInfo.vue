<template>
  <div class="mt-4">
      <div class="row mr-1">
          <div class="col-md-6">
            <div class="wrap-border">
                <app-avatar class="the-header__user-avt" src="https://picsum.photos/80/80" :size="80"></app-avatar>
                <div class="text-black">
                    <p class="mb-4">Họ và tên: <strong>Trần Văn Nam</strong></p>
                    <p>Lớp : <strong>10B</strong></p>
                </div>
            </div>
          </div>
          <div class="col-md-6 wrap-border flex-column justify-content-center">
            <h5 class="mb-4">Tiến độ học tập: <span class="text-primary">25 %</span></h5>
                <div class="w-100">
                    <app-progress
                        :percentage="25"
                        size="lg"
                        rounded
                    />
                </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.wrap-border{
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    padding: 13px 20px;
    background: #F2F2F2;
    display: flex;
    align-items: center;
}
</style>