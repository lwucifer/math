<template>
  <sub-block-section
    title="Thông tin chuyển khoản"
  >
    <template v-slot:content>
      <div class="form--normal">
        <div class="row">
          <div class="col-md-3"><label for="" class="form--normal__title">Chọn ngân hàng</label></div>
          <div class="col-md-9">
            <app-select
              class="mb-4"
              v-model="filters.bank"
              placeholder="Chọn ngân hàng"
              :options="banks"
              @change="handleChangedBank"
            />
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Chi nhánh</label></div>
          <div class="col-md-9">
            <app-input
              placeholder="Chi nhánh"
              v-model="filters.branch"
              @input="handleChangedBranch"
            />
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Tên chủ tài khoản</label></div>
          <div class="col-md-9">
            <app-input
              placeholder="Nhập tên chủ tài khoản"
              v-model="filters.owner"
              @input="handleChangedOwner"
            />
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Số tài khoản</label></div>
          <div class="col-md-9">
            <app-input
              placeholder="Nhập số tài khoản"
              v-model="filters.cardId"
              @input="handleChangedCardId"
            />
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Số tiền muốn rút</label></div>
          <div class="col-md-9">
            <app-input
              placeholder="Nhập số tiền muốn rút"
              v-model="filters.amount"
              type="number"
              @input="handleChangedAmount"
              class="mb-3"
            >
              <template v-slot:unit>
                <app-button
                  color="transparent"
                  class="px-0 font-weight-normal"
                  @click="getAllMoney"
                >
                  Rút hết
                </app-button>
              </template>
            </app-input>
            <div class="form--normal__note mb-3 d-flex justify-content-between">
              <span><i>Rút tối thiểu:</i> <i>{{ '50000' | toThousandFilter('.') }}</i>{{ CURRENCY }}</span>
              <span>Số dư: <span>{{ '500000' | toThousandFilter('.') }}</span>{{ CURRENCY }}</span>
            </div>
          </div>
          
          <div class="col-md-3"></div>
          <div class="col-md-9">
            <app-button
              @click="save"
              size="lg"
            >
              Xác nhận rút tiền
            </app-button>
          </div>
        </div>
      </div>
    </template>
  </sub-block-section>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { ERRORS } from "~/utils/error-code";
  import {CURRENCY} from "~/utils/config";
  import {
    required,
    minLength,
    sameAs,
    maxLength
  } from "vuelidate/lib/validators";
  import { validatePassword } from "~/utils/validations";

  export default {
    data() {
      return {
        filters: {
          bank: null,
          branch: null,
          owner: null,
          cardId: null,
          amount: null
        },
        CURRENCY: CURRENCY,
      };
    },
    props: {
      banks: {
        type: Array,
        default: () => []
      }
    },
    validations: {
    
    },
    computed: {
    },
    methods: {
      save() {
        console.log('[Do withdrawals] Submit')
      },
      handleChangedBank(val) {
        console.log('[Do withdrawals] Change bank')
      },
      handleChangedBranch(val) {
        console.log('[Do withdrawals] Change branch')
      },
      handleChangedOwner(val) {
        console.log('[Do withdrawals] Change owner')
      },
      handleChangedAmount(val) {
        console.log('[Do withdrawals] Change amount')
      },
      handleChangedCardId(val) {
        console.log('[Do withdrawals] Change card id')
      },
      getAllMoney() {
        console.log('[Do withdrawals] Get all money')
      }
    },
    watch: {
    
    }
  }
</script>

<style lang="scss">
</style>