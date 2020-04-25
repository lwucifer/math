<template>
  <fragment>
    <div class="school-filter__form__item">
      <app-vue-select
        class="app-vue-select"
        v-model="province"
        :options="provinces"
        label="name"
        placeholder="Theo tỉnh thành"
        :reduce="value => value"
        searchable
        clearable
        @input="handleChangeProvince"
      >
      </app-vue-select>
    </div>

    <div class="school-filter__form__item">
      <app-vue-select
        class="app-vue-select"
        v-model="district"
        :options="districts"
        label="name"
        :reduce="value => value"
        placeholder="Theo quận huyện"
        searchable
        clearable
        @input="handleChangedDistrict"
      >
      </app-vue-select>
    </div>

    <div class="school-filter__form__item">
      <app-vue-select
        class="app-vue-select"
        v-model="ward"
        :options="wards"
        label="name"
        :reduce="value => value"
        placeholder="Theo xã phường"
        searchable
        clearable
        @input="handleChangedWard"
      >
      </app-vue-select>
    </div>
  </fragment>
</template>

<script>
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";

export default {
  created() {
    this.$store.dispatch(
      `elearning/public/public-place/${actionTypes.ELEARNING_PUBLIC_PLACE.PROVINCE}`
    );
  },
  computed: {
    ...mapState("elearning/public/public-place", [
      "provinces",
      "districts",
      "wards"
    ])
  },
  data() {
    return {
      province: null,
      district: null,
      ward: null
    };
  },
  methods: {
    handleChangeProvince(province) {
      this.province = province;
    },
    handleChangedDistrict(district) {
      this.district = district;
    },
    handleChangedWard(ward) {
      this.ward = ward;
    }
  },
  watch: {
    async province() {
      const province_id = get(this, "province.id", "");
      this.$emit("handleChangeProvince", this.province);
      const options = {
        params: {
          province_id
        }
      };
      await this.$store.dispatch(
        `elearning/public/public-place/${actionTypes.ELEARNING_PUBLIC_PLACE.DISTRICT}`,
        options
      );
      this.district = null;
      this.ward = null;
    },
    async district() {
      const district_id = get(this, "district.id", "");
      this.$emit("handleChangedDistrict", this.district);
      const options = {
        params: {
          district_id
        }
      };
      await this.$store.dispatch(
        `elearning/public/public-place/${actionTypes.ELEARNING_PUBLIC_PLACE.WARD}`,
        options
      );
      this.ward = null;
    },
    ward() {
      this.$emit("handleChangedWard", this.ward);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-filter.scss";
</style>
