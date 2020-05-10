<template>
  <div>
    <div class="row">
      <div class="col-md-7 pr-5">
        <div class="point-choice">
          <app-button
            v-for="(n, index) in (counter - 1)"
            :key="index"
            class="mb-3"
            square
            :class="buttonCls(index*distance)"
            @click="selectPoint(index*distance)"
          >
            {{ index * distance }}
          </app-button>
          <app-button
            class="w-100 text-primary"
            :class="{ 'actived': 10 === point }"
            @click="selectPoint(10)"
          >
            10
          </app-button>
        </div>
      </div>
      <div class="col-md-5">
        <div class="final-score">
          <p v-if="point != null" class="text-center">
            <span
              class="d-block h1 mb-3"
              :class="{ 'score--pass': point >= parseInt(scoreToPass), 'score--fail': point < parseInt(scoreToPass) }"
            >
              {{ point }} Điểm
            </span>
            <span
              class="d-block h4"
              :class="{ 'score--pass': point >= parseInt(scoreToPass), 'score--fail': point < parseInt(scoreToPass) }"
            >
              {{ point >= parseInt(scoreToPass) ? 'Đạt' : 'Chưa đạt'}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PointChoice",
    props: {
      scoreToPass: {
        type: Number | String,
        required: true
      }
    },
    data() {
      return {
        distance: 0.25,
        point: null
      }
    },
    computed: {
      counter() {
        return (10/this.distance) + 1
      },
    },
    methods: {
      buttonCls(point) {
        return {
          'text-error': 0 <= point && point <= 3.75,
          'text-warning': 3.75 < point && point <= 7.75,
          'text-primary': point > 7.75,
          'actived': point === this.point
        }
      },
      selectPoint(point) {
        if (this.point == point) {
          this.point = null
        } else {
          this.point = point
        }
        this.$emit('changedPoint', this.point)
      }
    },
  }
</script>

<style scoped>

</style>