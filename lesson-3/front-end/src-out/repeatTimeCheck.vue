<template>
  <div class="check-time-main flex flex-align-center flex-justify-center">
    <div>
      <span class="el-icon-date mr8" />
      <!-- <span class="el-icon-date mr8" @click="checkoutTime(-1)" /> -->
      <span class="el-icon-arrow-left mr8" @click="checkoutTime(-1)" />
      <span class="check-time-content mr8">
        <el-popover
          placement="bottom"
          :width="160"
          popper-class="time-check-popove"
          trigger="click"
        >
          <div class="show-time-box">
            <div
              v-for="(item, index) in props.timeData"
              :key="index"
              class="time-select-box mt6"
              @click="checkTime(item, index)"
            >
              {{ item.showTime }}
            </div>
          </div>
          <!-- <el-table 
                          :data="props.timeData" 
                      >
                          <el-table-column>
                              <template #default="scope">
                                  <span>{{ scope.row.showTime }}</span>
                              </template>
                          </el-table-column>
                      </el-table> -->
          <template #reference>
            <el-button size="small">{{ activeItem.showTime }}</el-button>
          </template>
        </el-popover>
      </span>
      <span class="el-icon-arrow-right" @click="checkoutTime(1)" />
    </div>
  </div>
</template>

<script setup>
// const { watch }=require("vue-demi")

// import http from '@/util/request'
// import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  timeData: {
    type: Array,
  },
})
const emit = defineEmits(['checkTime'])
// const getCheckTime = () => {
//     console.log('timeCheck', props.timeData)
// }
const activeItem = ref({})
const activeIndex = ref(0)
// onMounted(() => {
//     getCheckTime()
// })
const checkTime = (item, index) => {
  console.log(item)
  activeItem.value = item
  activeIndex.value = index
  emit('checkTime', item)
}
function checkoutTime(num) {
  if (
    (activeIndex.value === 0 && num === -1) ||
    (activeIndex.value === props.timeData.length - 1 && num === 1)
  ) {
    // console.log('*********', activeIndex.value, props.timeData.length)
    return
  }
  activeIndex.value += num
  activeItem.value = props.timeData[activeIndex.value]
  // console.log('-------------', activeIndex.value, props.timeData.length)

  emit('checkTime', activeItem.value)
}

watch(
  () => props.timeData,
  () => {
    // console.log('111111', props.timeData)
    props.timeData.forEach((element, index) => {
      if (element.id == route.query.id) {
        activeItem.value = element
        activeIndex.value = index
      } else {
        return
      }
    })
  }
)
</script>

<style lang="scss" scoped>
.check-time-main {
  width: 212px; /*// height: 34px;*/
  background: #ffffff;
  border: 1px solid #d9d9d9;
  .check-time-content {
    width: 136px;
    height: 22px;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: #000000;
    .el-button {
      border: 0;
    }
  }
}
.show-time-box {
  overflow-y: scroll; /*// height: 240px;*/ /*// padding-top: 20px;*/
  .time-select-box {
    // height: 22px;
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>
