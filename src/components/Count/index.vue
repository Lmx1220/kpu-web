<!-- eslint-disable -->
<script>
  import {
    requestAnimationFrame,
    cancelAnimationFrame,
  } from './requestAnimationFrame'
  export default {
    name: 'Count',
    props: {
      startValue: {
        type: Number,
        required: false,
        default: 0,
      },
      endValue: {
        type: Number,
        required: false,
        default: 0,
      },
      duration: {
        type: Number,
        required: false,
        default: 3000,
      },
      autoplay: {
        type: Boolean,
        required: false,
        default: true,
      },
      decimals: {
        type: Number,
        required: false,
        default: 0,
        validator(value) {
          return value >= 0
        },
      },
      decimal: {
        type: String,
        required: false,
        default: '.',
      },
      separator: {
        type: String,
        required: false,
        default: ',',
      },
      prefix: {
        type: String,
        required: false,
        default: '',
      },
      suffix: {
        type: String,
        required: false,
        default: '',
      },
      useEasing: {
        type: Boolean,
        required: false,
        default: true,
      },
      easingFn: {
        type: Function,
        default(t, b, c, d) {
          return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
        },
      },
    },
    data() {
      return {
        localStartVal: this.startValue,
        displayValue: this.formatNumber(this.startValue),
        printVal: null,
        paused: false,
        localDuration: this.duration,
        startTime: null,
        timestamp: null,
        remaining: null,
        rAF: null,
      }
    },
    computed: {
      countDown() {
        return this.startValue > this.endValue
      },
    },
    watch: {
      startValue() {
        if (this.autoplay) {
          this.start()
        }
      },
      endValue() {
        if (this.autoplay) {
          this.start()
        }
      },
    },
    mounted() {
      if (this.autoplay) {
        this.start()
      }
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('mountedCallback')
    },
    unmounted() {
      cancelAnimationFrame(this.rAF)
    },
    methods: {
      start() {
        this.localStartVal = this.startValue
        this.startTime = null
        this.localDuration = this.duration
        this.paused = false
        this.rAF = requestAnimationFrame(this.count)
      },
      pauseResume() {
        if (this.paused) {
          this.resume()
          this.paused = false
        } else {
          this.pause()
          this.paused = true
        }
      },
      pause() {
        cancelAnimationFrame(this.rAF)
      },
      resume() {
        this.startTime = null
        this.localDuration = +this.remaining
        this.localStartVal = +this.printVal
        requestAnimationFrame(this.count)
      },
      reset() {
        this.startTime = null
        cancelAnimationFrame(this.rAF)
        this.displayValue = this.formatNumber(this.startValue)
      },
      count(timestamp) {
        if (!this.startTime) this.startTime = timestamp
        this.timestamp = timestamp
        const progress = timestamp - this.startTime
        this.remaining = this.localDuration - progress

        if (this.useEasing) {
          if (this.countDown) {
            this.printVal =
              this.localStartVal -
              this.easingFn(
                progress,
                0,
                this.localStartVal - this.endValue,
                this.localDuration
              )
          } else {
            this.printVal = this.easingFn(
              progress,
              this.localStartVal,
              this.endValue - this.localStartVal,
              this.localDuration
            )
          }
        } else {
          if (this.countDown) {
            this.printVal =
              this.localStartVal -
              (this.localStartVal - this.endValue) *
                (progress / this.localDuration)
          } else {
            this.printVal =
              this.localStartVal +
              (this.endValue - this.localStartVal) *
                (progress / this.localDuration)
          }
        }
        if (this.countDown) {
          this.printVal =
            this.printVal < this.endValue ? this.endValue : this.printVal
        } else {
          this.printVal =
            this.printVal > this.endValue ? this.endValue : this.printVal
        }

        this.displayValue = this.formatNumber(this.printVal)
        if (progress < this.localDuration) {
          this.rAF = requestAnimationFrame(this.count)
        } else {
          // eslint-disable-next-line vue/require-explicit-emits
          this.$emit('callback')
        }
      },
      isNumber(val) {
        return !isNaN(parseFloat(val))
      },
      formatNumber(num) {
        num = num.toFixed(this.decimals)
        num += ''
        const x = num.split('.')
        let x1 = x[0]
        const x2 = x.length > 1 ? this.decimal + x[1] : ''
        const rgx = /(\d+)(\d{3})/
        if (this.separator && !this.isNumber(this.separator)) {
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, `$1${this.separator}$2`)
          }
        }
        return this.prefix + x1 + x2 + this.suffix
      },
    },
  }
</script>

<template>
  <span>{{ displayValue }}</span>
</template>
