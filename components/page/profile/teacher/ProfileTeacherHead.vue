<template>
  <div class="container">
      <div class="row">
        <div class="col-6 d-flex">
            <div>
                <app-avatar src="https://picsum.photos/150/150" :size="150"/>
            </div>
            <div class="wrapInfoTeach__Profile">
                <div>
                    <span>Trần Nam</span>
                </div>
                <div>
                    <span>Giáo viên trường THCS Nguyễn Trãi, Hà Đông, Hà Nội</span>
                </div>
                <div class="d-flex align-items-center">
                    <app-stars :stars="5" :size="20"/>
                    <strong>4.5</strong>
                    <span>  (2000)</span>
                </div>
            </div>
        </div>
      <div class="wrapCourse__Profile col-6">
          <div>
              <span>5</span>
              <span>Bài giảng</span>
          </div>
          <div>
              <span>20</span>
              <span>Bài giảng</span>
          </div>
          <div>
              <span>500</span>
              <span>Bài giảng</span>
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
.wrapInfoTeach__Profile{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    div:first-child span{
        font-weight: bold;
        font-size: 20px;
        line-height: 16px;
    }
    div:nth-child(2) span{
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        color: #666666;
        margin: 14px 0px 22px 0px;
        display:inline-block;
    }
    div:last-child{
        strong{
            margin-left:20px;
        }
    }
}
.wrapCourse__Profile{
    display: flex;
    justify-content: flex-end;
    > div{
        background:#EBF7F3;
        border: 1px solid #EEEEEE;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        margin: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    div span:first-child{
            font-weight: bold;
            font-size: 30px;
            line-height: 41px;
            color: #32AF85;
        }
}
</style>