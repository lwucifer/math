<template>
  <div class="modal_payment" :class="show ? 'show' : ''" v-if="fail">
      
          <div class="d-flex flex-column align-items-center">
              <IconShoppingCartAlt class="fill-secondary"/>
              <span>Thêm sản phẩm vào giỏ hàng không thành công.</span>
          </div>
  </div>
  <div class="modal_payment" :class="show ? 'show' : ''" v-else>
        <div class="d-flex align-items-center">
            <IconSuccess class="icon mr-2"/>
            <span>Thêm giỏ hàng thành công</span>
        </div>
        <app-button square class="mt-4">Xem giỏ hàng và thanh toán</app-button>
    </div>
</template>

<script>
import IconSuccess from '~/assets/svg/icons/success.svg?inline';
import IconShoppingCartAlt from '~/assets/svg/design-icons/shopping-cart-alt.svg?inline';
export default {
    components:{
        IconSuccess,
        IconShoppingCartAlt
    },
    props:{
        show:{
            type: Boolean,
            default: true
        },
        fail:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.modal_payment{
    background: white;
    width: 273px;
    padding:20px;
    position: fixed;
    z-index: 120;
    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 10%;
    right: 5%;
    visibility: hidden;
    
}
.show{
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
    visibility: visible;
    }
@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 10%; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 10%; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 10%; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 10%; opacity: 1;}
  to {top: 0; opacity: 0;}
}
</style>