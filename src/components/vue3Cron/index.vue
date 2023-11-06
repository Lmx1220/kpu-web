<script setup lang="ts">
defineOptions({
  name: 'Vue3Cron',
})
defineProps({
  value: String,
  maxHeight: String,
  change: Function,
})
const emits = defineEmits<{
  'update:value': [
    value: string,
  ]
  'change': [
    value: string,
  ]
}>()
// (默认是每一分钟一次)
const weekList = ref([
  { name: '星期日', value: 'SUN', val: 1 },
  { name: '星期一', value: 'MON', val: 2 },
  { name: '星期二', value: 'TUE', val: 3 },
  { name: '星期三', value: 'WED', val: 4 },
  { name: '星期四', value: 'THU', val: 5 },
  { name: '星期五', value: 'FRI', val: 6 },
  { name: '星期六', value: 'SAT', val: 7 },
])

const tabActive = ref(1)
const currYear = ref(new Date().getFullYear())
function onHandleTab(index: number) {
  tabActive.value = index
}

// (默认是每一分钟一次)
const state: any = reactive({
  second: {
    cronEvery: '1',
    incrementStart: 0,
    incrementIncrement: 1,
    rangeStart: 0,
    rangeEnd: 0,
    specificSpecific: [],
  },
  minute: {
    cronEvery: '1',
    incrementStart: 0,
    incrementIncrement: 1,
    rangeStart: 0,
    rangeEnd: 0,
    specificSpecific: [],
  },
  hour: {
    cronEvery: '1',
    incrementStart: 1,
    incrementIncrement: 1,
    rangeStart: 0,
    rangeEnd: 0,
    specificSpecific: [],
  },
  day: {
    cronEvery: '1',
    incrementStart: 1,
    incrementIncrement: 1,
    rangeStart: 0,
    rangeEnd: 0,
    specificSpecific: [],
    cronLastSpecificDomDay: 1,
    cronDaysBeforeEomMinus: 0,
    cronDaysNearestWeekday: 1,
  },
  week: {
    cronEvery: '1',
    incrementStart: 1,
    incrementIncrement: 1,
    specificSpecific: [],
    cronNthDayDay: 1,
    cronNthDayNth: 1,
  },
  month: {
    cronEvery: '1',
    incrementStart: 1,
    incrementIncrement: 1,
    rangeStart: 1,
    rangeEnd: 1,
    specificSpecific: [],
  },
  year: {
    cronEvery: '1',
    incrementStart: new Date().getFullYear(),
    incrementIncrement: 1,
    rangeStart: new Date().getFullYear(),
    rangeEnd: new Date().getFullYear(),
    specificSpecific: [],
  },
  output: {
    second: '',
    minute: '',
    hour: '',
    day: '',
    month: '',
    Week: '',
    year: '',
  },
  secondsText: computed(() => {
    let seconds = ''
    const cronEvery = state.second.cronEvery
    switch (cronEvery?.toString()) {
      case '1':
        seconds = '*'
        break
      case '2':
        seconds = `${state.second.incrementStart}/${state.second.incrementIncrement}`
        break
      case '3':
        state.second.specificSpecific.map((val: any) =>
          seconds += `${val},`,
        )
        seconds = seconds.slice(0, -1)
        break
      case '4':
        seconds = `${state.second.rangeStart}-${state.second.rangeEnd}`
        break
    }
    return seconds
  }),
  minutesText: computed(() => {
    let minutes = ''
    const cronEvery = state.minute.cronEvery
    switch (cronEvery?.toString()) {
      case '1':
        minutes = '*'
        break
      case '2':
        minutes = `${state.minute.incrementStart}/${state.minute.incrementIncrement}`
        break
      case '3':
        state.minute.specificSpecific.map((val: any) =>
          minutes += `${val},`,
        )
        minutes = minutes.slice(0, -1)
        break
      case '4':
        minutes = `${state.minute.rangeStart}-${state.minute.rangeEnd}`
        break
    }
    return minutes
  }),
  hoursText: computed(() => {
    let hours = ''
    const cronEvery = state.hour.cronEvery
    switch (cronEvery?.toString()) {
      case '1':
        hours = '*'
        break
      case '2':
        hours = `${state.hour.incrementStart}/${state.hour.incrementIncrement}`
        break
      case '3':
        state.hour.specificSpecific.map((val: any) =>
          hours += `${val},`,
        )
        hours = hours.slice(0, -1)
        break
      case '4':
        hours = `${state.hour.rangeStart}-${state.hour.rangeEnd}`
        break
    }
    return hours
  }),
  daysText: computed(() => {
    let days = ''
    const cronEvery = state.day.cronEvery
    switch (cronEvery?.toString()) {
      case '1':
        break
      case '2':
      case '4':
      case '11':
        days = '?'
        break
      case '3':
        days = `${state.day.incrementStart}/${state.day.incrementIncrement}`
        break
      case '5':
        state.day.specificSpecific.map((val: any) =>
          days += `${val},`,
        )
        days = days.slice(0, -1)
        break
      case '6':
        days = 'L'
        break
      case '7':
        days = 'LW'
        break
      case '8':
        days = `${state.day.cronLastSpecificDomDay}L`
        break
      case '9':
        days = `L-${state.day.cronDaysBeforeEomMinus}`
        break
      case '10':
        days = `${state.day.cronDaysNearestWeekday}W`
        break
    }
    return days
  }),
  weeksText: computed(() => {
    let weeks = ''
    const cronEvery = state.day.cronEvery
    switch (cronEvery?.toString()) {
      case '1':
      case '3':
      case '5':
        weeks = '?'
        break
      case '2':
        weeks = `${state.week.incrementStart}/${state.week.incrementIncrement}`
        break
      case '4':
        state.week.specificSpecific.map((val: any) =>
          weeks += `${val},`,
        )
        weeks = weeks.slice(0, -1)
        break
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
        weeks = '?'
        break
      case '11':
        weeks = `${state.week.cronNthDayDay}#${state.week.cronNthDayNth}`
        break
    }
    return weeks
  }),
  monthsText: computed(() => {
    let months = ''
    const cronEvery = state.month.cronEvery
    switch (cronEvery?.toString()) {
      case '1':
        months = '*'
        break
      case '2':
        months = `${state.month.incrementStart}/${state.month.incrementIncrement}`
        break
      case '3':
        state.month.specificSpecific.map((val: any) =>
          months += `${val},`,
        )
        months = months.slice(0, -1)
        break
      case '4':
        months = `${state.month.rangeStart}-${state.month.rangeEnd}`
        break
    }
    return months
  }),
  yearsText: computed(() => {
    let years = ''
    // TODO，目前先不指定年份，注释以下代码
    const cronEvery = state.year.cronEvery
    switch (cronEvery?.toString()) {
      case '1':
        years = '*'
        break
      case '2':
        years = `${state.year.incrementStart}/${state.year.incrementIncrement}`
        break
      case '3':
        state.year.specificSpecific.map((val: any) =>
          years += `${val},`,
        )
        years = years.slice(0, -1)
        break
      case '4':
        years = `${state.year.rangeStart}-${state.year.rangeEnd}`
        break
    }
    return years
  }),
  cron: computed(() => {
    return `${state.secondsText || '*'} ${state.minutesText || '*'} ${state.hoursText || '*'} ${state.daysText || '*'} ${state.monthsText || '*'} ${state.weeksText || '?'} ${state.yearsText || '*'}`
  }),
})

// function handleChange() {
//   if (typeof state.cron !== 'string') {
//     return false
//   }
//   emits('change', state.cron)
// }
// function rest(data: any) {
//   for (const i in data) {
//     if (data[i] instanceof Object) {
//       rest(data[i])
//     }
//     else {
//       switch (typeof data[i]) {
//         case 'object':
//           data[i] = []
//           break
//         case 'string':
//           data[i] = ''
//           break
//       }
//     }
//   }
// }

watch(
  () => state.cron,
  (value) => {
    if (typeof state.cron !== 'string') {
      return
    }
    emits('update:value', value)
  },
)
</script>

<template>
  <div class="v3c">
    <ul class="v3c-tab">
      <li class="v3c-tab-item" :class="{ 'v3c-active': tabActive === 1 }" @click="onHandleTab(1)">
        秒
      </li>
      <li class="v3c-tab-item" :class="{ 'v3c-active': tabActive === 2 }" @click="onHandleTab(2)">
        分
      </li>
      <li class="v3c-tab-item" :class="{ 'v3c-active': tabActive === 3 }" @click="onHandleTab(3)">
        时
      </li>
      <li class="v3c-tab-item" :class="{ 'v3c-active': tabActive === 4 }" @click="onHandleTab(4)">
        天
      </li>
      <li class="v3c-tab-item" :class="{ 'v3c-active': tabActive === 5 }" @click="onHandleTab(5)">
        月
      </li>
      <li class="v3c-tab-item" :class="{ 'v3c-active': tabActive === 6 }" @click="onHandleTab(6)">
        年
      </li>
    </ul>
    <!-- 秒 -->
    <div v-show="tabActive === 1" class="v3c-content">
      <!-- 每一秒 -->
      <div>
        <ElRadio v-model="state.second.cronEvery" label="1">
          每一秒钟
        </ElRadio>
      </div>
      <!-- 每隔多久 -->
      <div class="mt-15">
        <ElRadio v-model="state.second.cronEvery" label="2">
          每隔
        </ElRadio>
        <ElInputNumber v-model="state.second.incrementIncrement" :min="1" :max="60" controls-position="right" />
        <span class="ml-5 mr-5">秒执行， 从</span>
        <ElInputNumber v-model="state.second.incrementStart" :min="0" :max="59" controls-position="right" />
        <span>秒开始</span>
      </div>
      <!-- 具体秒数 -->
      <div class="mt-15">
        <ElRadio v-model="state.second.cronEvery" label="3">
          具体秒数(可多选)
        </ElRadio>
        <ElSelect v-model="state.second.specificSpecific" multiple clearable style="width: 140px;">
          <ElOption v-for="(item, index) in 60" :key="index" :label="index" :value="index" />
        </ElSelect>
      </div>
      <!-- 周期从 -->
      <div class="mt-15">
        <ElRadio v-model="state.second.cronEvery" label="4">
          周期从
        </ElRadio>
        <ElInputNumber v-model="state.second.rangeStart" :min="0" :max="59" controls-position="right" />
        <Sapn>秒</Sapn><span class="ml-10 mr-5">到</span>
        <ElInputNumber v-model="state.second.rangeEnd" :min="0" :max="59" controls-position="right" />
        <Sapn>秒</Sapn>
      </div>
    </div>
    <!-- 分钟 -->
    <div v-show="tabActive === 2" class="v3c-content">
      <!-- 每一分钟 -->
      <div>
        <ElRadio v-model="state.minute.cronEvery" label="1">
          每一分钟
        </ElRadio>
      </div>
      <!-- 每隔多久 -->
      <div class="mt-15">
        <ElRadio v-model="state.minute.cronEvery" label="2">
          每隔
        </ElRadio>
        <ElInputNumber v-model="state.minute.incrementIncrement" :min="1" :max="60" controls-position="right" />
        <span class="ml-5 mr-5">分执行，从</span>
        <ElInputNumber v-model="state.minute.incrementStart" :min="0" :max="59" controls-position="right" />
        <span>分开始</span>
      </div>
      <!-- 具体分钟数 -->
      <div class="mt-15">
        <ElRadio v-model="state.minute.cronEvery" label="3">
          具体分钟数(可多选)
        </ElRadio>
        <ElSelect v-model="state.minute.specificSpecific" multiple clearable style="width: 140px;">
          <ElOption v-for="(item, index) in 60" :key="index" :label="index" :value="index" />
        </ElSelect>
      </div>
      <!-- 周期从 -->
      <div class="mt-15">
        <ElRadio v-model="state.minute.cronEvery" label="4">
          周期从
        </ElRadio>
        <ElInputNumber v-model="state.minute.rangeStart" :min="0" :max="59" controls-position="right" />
        <span>分</span><span class="ml-10 mr-5">到</span>
        <ElInputNumber v-model="state.minute.rangeEnd" :min="0" :max="59" controls-position="right" />
        <span>分</span>
      </div>
    </div>
    <!-- 小时 -->
    <div v-show="tabActive === 3" class="v3c-content">
      <!-- 每一小时 -->
      <div>
        <ElRadio v-model="state.hour.cronEvery" label="1">
          每一小时
        </ElRadio>
      </div>
      <!-- 每隔多久 -->
      <div class="mt-15">
        <ElRadio v-model="state.hour.cronEvery" label="2">
          每隔
        </ElRadio>
        <ElInputNumber v-model="state.hour.incrementIncrement" :min="1" :max="24" controls-position="right" />
        <span class="ml-5 mr-5">小时执行，从</span>
        <ElInputNumber v-model="state.hour.incrementStart" :min="0" :max="23" controls-position="right" />
        <span>小时开始</span>
      </div>
      <!-- 具体小时数 -->
      <div class="mt-15">
        <ElRadio v-model="state.hour.cronEvery" label="3">
          具体小时数(可多选)
        </ElRadio>
        <ElSelect v-model="state.hour.specificSpecific" multiple clearable style="width: 140px;">
          <ElOption v-for="(item, index) in 24" :key="index" :label="index" :value="index" />
        </ElSelect>
      </div>
      <!-- 周期从 -->
      <div class="mt-15">
        <ElRadio v-model="state.hour.cronEvery" label="4">
          周期从
        </ElRadio>
        <ElInputNumber v-model="state.hour.rangeStart" :min="0" :max="23" controls-position="right" />
        <span>时</span><span class="ml-10 mr-5">到</span>
        <ElInputNumber v-model="state.hour.rangeEnd" :min="0" :max="23" controls-position="right" />
        <span>时</span>
      </div>
    </div>
    <!-- 天 -->
    <div v-show="tabActive === 4" class="v3c-content">
      <!-- 1 -->
      <div>
        <ElRadio v-model="state.day.cronEvery" label="1">
          每一天
        </ElRadio>
      </div>
      <!-- 2 -->
      <div class="mt-15">
        <ElRadio v-model="state.day.cronEvery" label="2">
          每隔
        </ElRadio>
        <ElInputNumber v-model="state.week.incrementIncrement" :min="1" :max="60" controls-position="right" />
        <span class="ml-5 mr-5">周执行，从</span>
        <ElInputNumber v-model="state.week.incrementStart" :min="1" :max="52" controls-position="right" />
        <span>周开始</span>
      </div>
      <!-- 3 -->
      <div class="mt-15">
        <ElRadio v-model="state.day.cronEvery" label="3">
          每隔
        </ElRadio>
        <ElInputNumber v-model="state.day.incrementIncrement" :min="1" :max="30" controls-position="right" />
        <span class="ml-5 mr-5">天执行，从</span>
        <ElInputNumber v-model="state.day.incrementStart" :min="1" :max="30" controls-position="right" />
        <span>天开始</span>
      </div>
      <!-- 4 -->
      <div class="mt-15">
        <ElRadio v-model="state.day.cronEvery" label="4">
          具体星期几(可多选)
        </ElRadio>
        <ElSelect v-model="state.week.specificSpecific" multiple clearable style="width: 140px;">
          <ElOption v-for="(item, index) in weekList" :key="index" :label="item.name" :value="item.value" />
        </ElSelect>
      </div>
      <!-- 5 -->
      <div class="mt-15">
        <ElRadio v-model="state.day.cronEvery" label="5">
          具体天数(可多选)
        </ElRadio>
        <ElSelect v-model="state.day.specificSpecific" multiple clearable style="width: 140px;">
          <ElOption v-for="(item, index) in 31" :key="index" :label="item" :value="item" />
        </ElSelect>
      </div>
      <!-- 6 -->
      <!-- <div class="mt-15">
        <el-radio label="6" v-model="state.day.cronEvery">在这个月的最后一天</el-radio>
      </div> -->
      <!-- 7 -->
      <!-- <div class="mt-15">
        <el-radio label="7" v-model="state.day.cronEvery">在这个月的最后一个工作日</el-radio>
      </div> -->
      <!-- 8 -->
      <!-- <div class="mt-15">
        <el-radio label="8" v-model="state.day.cronEvery">在这个月的最后一个</el-radio>
        <el-select v-model="state.day.cronLastSpecificDomDay" style="width: 140px">
          <el-option v-for="(item, index) in weekList" :key="index" :label="item.name" :value="item.val" />
        </el-select>
      </div> -->
      <!-- 9 -->
      <!-- <div class="mt-15">
          <el-radio label="9" v-model="state.day.cronEvery">{{ }}</el-radio>
          <el-input-number v-model="state.day.cronDaysBeforeEomMinus" :min="1" :max="31" controls-position="right" />
          <span>在本月底前</span>
      </div> -->
      <!-- 10 -->
      <!-- <div class="mt-15">
        <el-radio label="10" v-model="state.day.cronEvery">最近的工作日（周一至周五）至本月</el-radio>
        <el-input-number v-model="state.day.cronDaysNearestWeekday" :min="1" :max="31" controls-position="right" />
        <span>日</span>
      </div> -->
      <!-- 11 -->
      <!-- <div class="mt-15">
        <el-radio label="11" v-model="state.day.cronEvery">在这个月的第</el-radio>
        <el-input-number v-model="state.week.cronNthDayNth" :min="1" :max="5" controls-position="right" />
        <span>个</span>
        <el-select v-model="state.week.cronNthDayDay" style="width: 140px">
          <el-option v-for="(item, index) in weekList" :key="index" :label="item.name" :value="item.val" />
        </el-select>
      </div> -->
    </div>
    <!-- 月 -->
    <div v-show="tabActive === 5" class="v3c-content">
      <!-- 1 -->
      <div>
        <ElRadio v-model="state.month.cronEvery" label="1">
          每一月
        </ElRadio>
      </div>
      <!-- 2 -->
      <div class="mt-15">
        <ElRadio v-model="state.month.cronEvery" label="2">
          每隔
        </ElRadio>
        <ElInputNumber v-model="state.month.incrementIncrement" :min="1" :max="12" controls-position="right" />
        <span class="ml-5 mr-5">月执行，从</span>
        <ElInputNumber v-model="state.month.incrementStart" :min="1" :max="12" controls-position="right" />
        <span>月开始</span>
      </div>
      <!-- 3 -->
      <div class="mt-15">
        <ElRadio v-model="state.month.cronEvery" label="3">
          具体月数(可多选)
        </ElRadio>
        <ElSelect v-model="state.month.specificSpecific" multiple clearable style="width: 140px;">
          <ElOption v-for="(item, index) in 12" :key="index" :label="item" :value="item" />
        </ElSelect>
      </div>
      <!-- 4 -->
      <div class="mt-15">
        <ElRadio v-model="state.month.cronEvery" label="4">
          周期从
        </ElRadio>
        <ElInputNumber v-model="state.month.rangeStart" :min="1" :max="12" controls-position="right" />
        <span>月</span><span class="ml-10 mr-5">到</span>
        <ElInputNumber v-model="state.month.rangeEnd" :min="1" :max="12" controls-position="right" />
        <span>月</span>
      </div>
    </div>
    <!-- 年 -->
    <div v-show="tabActive === 6" class="v3c-content">
      <!-- 1 -->
      <div>
        <ElRadio v-model="state.year.cronEvery" label="1">
          每一年
        </ElRadio>
      </div>
      <!-- 2 -->
      <div class="mt-15">
        <ElRadio v-model="state.year.cronEvery" label="2">
          每隔
        </ElRadio>
        <ElInputNumber v-model="state.year.incrementIncrement" :min="1" :max="99" controls-position="right" />
        <span class="ml-5 mr-5">年执行，从</span>
        <ElInputNumber
          v-model="state.year.incrementStart" :min="currYear" :max="currYear + 10"
          controls-position="right" style="width: 100px;"
        />
        <span>年开始</span>
      </div>
      <!-- 3 -->
      <div class="mt-15">
        <ElRadio v-model="state.year.cronEvery" label="3">
          具体年份(可多选)
        </ElRadio>
        <ElSelect v-model="state.year.specificSpecific" multiple clearable style="width: 140px;">
          <ElOption v-for="(item, index) in 100" :key="index" :label="currYear + item" :value="currYear + item" />
        </ElSelect>
      </div>
      <!-- 4 -->
      <div class="mt-15">
        <ElRadio v-model="state.year.cronEvery" label="4">
          周期从
        </ElRadio>
        <ElInputNumber
          v-model="state.year.rangeStart" :min="currYear" :max="currYear + 10" controls-position="right"
          style="width: 100px;"
        />
        <span>年</span><span class="ml-10 mr-5">到</span>
        <ElInputNumber
          v-model="state.year.rangeEnd" :min="currYear" :max="currYear + 10" controls-position="right"
          style="width: 100px;"
        />
        <span>年</span>
      </div>
    </div>
    <!-- 结果 -->
    <!-- <div class="v3c-footer">
      <div style="flex: 1">
        CRON &nbsp;: &nbsp;&nbsp;<span class="cron">{{ state.cron }}</span>
        &nbsp; &nbsp; &nbsp;
        <button class="btn-ok" @click.stop="handleChange">生成cron</button>
      </div>
    </div> -->
  </div>
</template>

<style lang="css" scoped>
:deep(.el-input-number) {
  width: 80px;
  margin-right: 5px;
}

:deep(.el-radio) {
  margin-right: 10px;
}

.v3c {
  width: auto;
  border: 1px solid #f5f7fa;
}

.v3c-tab {
  padding: 0;
  list-style: none;
  margin: 0;
  background-color: #f5f7fa;
  display: flex;
}

.v3c-tab-item {
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding: 6px;
}

.v3c-tab-item.v3c-active {
  background-color: #409eff;
  color: #fff;
}

.v3c-lang-btn {
  background-color: #61ddaa;
  color: #fff;

  /* border-radius: 10px; */
}

.v3c-content {
  padding: 20px;
  max-height: v-bind(maxHeight);
  overflow: hidden;
  overflow-y: auto;
}

.p-20 {
  padding: 20px;
}

.v3c-footer {
  background-color: #f5f7fa;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  text-align: center;
}

.btn-ok {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background: #409eff;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #fff;
  border-color: #409eff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;
}

.btn-close {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background: #61ddaa;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #fff;
  border-color: #61ddaa;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;
}

.cron {
  background-color: #61ddaa;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
}
</style>
