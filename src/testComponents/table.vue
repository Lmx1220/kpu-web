<!--<script setup lang="ts">-->
<!--import type { FormInstance } from 'element-plus'-->
<!--import { ElNotification, ElTable } from 'element-plus'-->
<!--import { keyBy } from 'lodash-es'-->
<!--import { onUnmounted } from 'vue'-->
<!---->
<!--import XEUtils from 'xe-utils'-->
<!--import { eqEmptyValue, isArray } from '@/util/is'-->

<!--defineOptions({-->
<!--  name: 'Table',-->
<!--})-->
<!--const { t } = useI18n()-->
<!--const data: Ref<any> = ref({-->
<!--  dataList: [-->
<!--    {-->
<!--      id: '4',-->
<!--      name: '1test',-->
<!--      comment: '1test',-->
<!--      isPk: null,-->
<!--    },-->
<!--    {-->
<!--      id: '1',-->
<!--      name: '1test',-->
<!--      comment: '1test',-->
<!--      isPk: null,-->
<!--    },-->
<!--    {-->
<!--      id: '2',-->
<!--      name: '1test',-->
<!--      comment: '1test',-->
<!--      isPk: true,-->
<!--    },-->
<!--    {-->
<!--      id: '3',-->
<!--      name: '1test',-->
<!--      comment: '',-->
<!--      isPk: null,-->
<!--    },-->
<!--  ],-->
<!--  batch: {-->
<!--    enable: false,-->
<!--    selectionDataList: [],-->
<!--  },-->
<!--})-->
<!--const tableRef = ref<typeof ElTable>()-->
<!--const formRef = ref<FormInstance>()-->

<!--const tableSourceData = keyBy(XEUtils.clone(data.value.dataList, true), 'id')-->
<!--const editIds = ref<string[]>([])-->
<!--const removeList: any[] = []-->
<!--const insertList: any = {}-->
<!--onMounted(() => {-->
<!--  document.addEventListener('click', f)-->
<!--})-->
<!--onUnmounted(() => {-->
<!--  document.removeEventListener('click', f)-->
<!--})-->
<!--function f(event: EventTarget) {-->
<!--  event.preventDefault()-->
<!--  event.stopPropagation()-->
<!--  const isClickInsideFormTableEdit = Array.from(document.querySelectorAll('.form-table-edit')).some(element => element.contains(event?.target))-->
<!--  if (!isClickInsideFormTableEdit) {-->
<!--    editIds.value = []-->
<!--  }-->
<!--}-->
<!--function onCellClick(row: any) {-->
<!--  editIds.value = [row.id]-->
<!--}-->

<!--function onCellClassName({ row, column }: any) {-->
<!--  const sourceData = tableSourceData[row.id]-->
<!--  if (sourceData && column.property) {-->
<!--    if (!eqCellValue(row, sourceData, column.property)) {-->
<!--      return 'col&#45;&#45;dirty'-->
<!--    }-->
<!--  }-->
<!--}-->

<!--function onRowClassName({ row }: any) {-->
<!--  if (!tableSourceData[row.id]) {-->
<!--    return 'is&#45;&#45;new row&#45;&#45;new'-->
<!--  }-->
<!--}-->
<!--function eqCellValue(row1: any, row2: any, field: string) {-->
<!--  const val1 = XEUtils.get(row1, field)-->
<!--  const val2 = XEUtils.get(row2, field)-->
<!--  if (eqEmptyValue(val1) && eqEmptyValue(val2)) {-->
<!--    return true-->
<!--  }-->
<!--  if (XEUtils.isString(val1) || XEUtils.isNumber(val1)) {-->
<!--    return (`${val1}`) === (`${val2}`)-->
<!--  }-->
<!--  return XEUtils.isEqual(val1, val2)-->
<!--}-->
<!--function onDel(row: any) {-->
<!--  if (insertList[row.id]) {-->
<!--    XEUtils.remove(data.value.dataList, item => item.id === row.id)-->
<!--    delete insertList[row.id]-->
<!--  }-->
<!--  else {-->
<!--    removeList.push(XEUtils.remove(data.value.dataList, item => item.id === row.id))-->
<!--  }-->
<!--}-->
<!--function onAdd() {-->
<!--  const form = {-->
<!--    id: XEUtils.uniqueId('row_'),-->
<!--  }-->
<!--  insertList[form.id] = form-->
<!--  data.value.dataList.unshift(form)-->
<!--}-->
<!--const fullAllDataRowIdData = computed(() => keyBy(data.value.dataList, 'id'))-->
<!--/**-->
<!-- * 获取新增的临时数据-->
<!-- */-->
<!--function getInsertRecords() {-->
<!--  const insertRecords: any[] = []-->
<!--  for (const key in insertList) {-->
<!--    const row = insertList[key]-->
<!--    if (fullAllDataRowIdData.value[row.id]) {-->
<!--      insertRecords.push(row)-->
<!--    }-->
<!--  }-->
<!--  return insertRecords-->
<!--}-->

<!--/**-->
<!-- * 获取已删除的数据-->
<!-- */-->
<!--function getRemoveRecords() {-->
<!--  return removeList-->
<!--}-->
<!--const visibleColumn = ['isPk', 'comment']-->
<!--function getUpdateRecords() {-->
<!--  return data.value.dataList.filter((item: any) => isUpdateByRow(item))-->
<!--}-->
<!--function isUpdateByRow(row: any, field?: string) {-->
<!--  const oRow = tableSourceData[row.id]-->
<!--  if (!oRow) {-->
<!--    return false-->
<!--  }-->
<!--  if (oRow) {-->
<!--    if (arguments.length > 1) {-->
<!--      return !eqCellValue(oRow, row, field as string)-->
<!--    }-->
<!--    for (let index = 0, len = visibleColumn.length; index < len; index++) {-->
<!--      const property = visibleColumn[index]-->
<!--      if (property && !eqCellValue(oRow, row, property)) {-->
<!--        return true-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  return false-->
<!--}-->

<!--function getRecordset() {-->
<!--  return {-->
<!--    insertRecords: getInsertRecords(),-->
<!--    removeRecords: getRemoveRecords(),-->
<!--    updateRecords: getUpdateRecords(),-->
<!--  }-->
<!--}-->
<!--async function toSave() {-->
<!--  try {-->
<!--    await formRef.value?.validate((valid, fields) => {-->
<!--      if (valid) {-->
<!--        console.log('submit!')-->
<!--        console.log(getRecordset())-->
<!--      }-->
<!--      else {-->
<!--        let message = ''-->
<!--        if (fields) {-->
<!--          const keys = Object.keys(fields)-->
<!--          keys.forEach((item) => {-->
<!--            console.log(fields[item])-->
<!--            console.log(extractNumbers(item))-->
<!--            let index = extractNumbers(item)-->

<!--            fields[item].forEach((item2) => {-->
<!--              if (isArray(index)) {-->
<!--                index.map(num => num + 1)-->
<!--              }-->
<!--              else {-->
<!--                if (index !== undefined) {-->
<!--                  index = index + 1-->
<!--                }-->
<!--              }-->
<!--              message += `第 ${index} 行 校验错误：${item2.message}  <br/>`-->
<!--            })-->
<!--          })-->
<!--          const arr = keys[keys.length - 1].split('.')-->
<!--          arr.splice(arr.length - 1, 1, 'id')-->
<!--          editIds.value = [XEUtils.get(data.value, arr)]-->
<!--        }-->
<!--        ElNotification({-->
<!--          title: '校验失败',-->
<!--          type: 'warning',-->
<!--          message,-->
<!--          dangerouslyUseHTMLString: true,-->
<!--        })-->
<!--        console.log('error submit!', fields)-->
<!--      }-->
<!--    })-->
<!--  }-->
<!--  catch (e) {-->
<!--    console.error(e)-->
<!--  }-->
<!--}-->
<!--function extractNumbers(str: string) {-->
<!--  const regex = /\d+/g-->
<!--  const numbers = str.match(regex)?.map(Number)-->
<!--  if (numbers) {-->
<!--    return numbers.length > 1 ? numbers : numbers[0]-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    <ElButton @click="onAdd">-->
<!--      {{ t('common.title.add') }}-->
<!--    </ElButton>-->
<!--    <ElForm ref="formRef" :model="data" class="form-table-edit">-->
<!--      <ElTable-->
<!--        ref="tableRef"-->
<!--        v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%" highlight-current-row-->
<!--        strip :cell-class-name="onCellClassName"-->
<!--        :row-class-name="onRowClassName"-->
<!--        @selection-change="data.batch.selectionDataList = $event"-->
<!--        @cell-click="onCellClick"-->
<!--      >-->
<!--        <ElTableColumn v-if="data.batch.enable" align="center" fixed type="selection" />-->
<!--        <ElTableColumn align="center" fixed label="#" width="100">-->
<!--          &lt;!&ndash;          <template #default="{ $index }"> &ndash;&gt;-->
<!--          &lt;!&ndash;            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }} &ndash;&gt;-->
<!--          &lt;!&ndash;          </template> &ndash;&gt;-->
<!--        </ElTableColumn>-->
<!--        <ElTableColumn fixed label="列名称" prop="name" width="370" />-->
<!--        <ElTableColumn fixed label="列类型" prop="isPk" width="100">-->
<!--          <template #default="{ row, $index }">-->
<!--            <div class="edit-column">-->
<!--              <ElFormItem-->
<!--                v-if="XEUtils.includes(editIds, row.id)" :prop="`dataList.${$index}.isPk`" :rules="[{-->
<!--                  required: true,-->
<!--                  message: '请输入',-->
<!--                  trigger: 'blur',-->
<!--                }]"-->
<!--                @click="(e:Event) => { e.stopPropagation() }"-->
<!--              >-->
<!--                <ElSwitch-->
<!--                  v-model="row.isPk"-->
<!--                />-->
<!--              </ElFormItem>-->
<!--              <span v-else>{{ row.isPk }}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </ElTableColumn>-->
<!--        <ElTableColumn label="列描述" prop="comment" min-width="200" show-overflow-tooltip>-->
<!--          <template #header="{ column }">-->
<!--            <i class="align-middle required-icon" />-->
<!--            <SvgIcon class="align-middle mr-1" name="ep:edit" />-->
<!--            <span>  {{ column.label }}</span>-->
<!--          </template>-->
<!--          <template #default="{ row, $index }">-->
<!--            <div class="edit-column">-->
<!--              <ElFormItem-->
<!--                v-show="XEUtils.includes(editIds, row.id)" :prop="`dataList.${$index}.comment`" :rules="[{-->
<!--                  required: true,-->
<!--                  message: '请输入',-->
<!--                  trigger: 'blur',-->
<!--                }]"-->
<!--                @click="(e:Event) => { e.stopPropagation() }"-->
<!--              >-->
<!--                <ElInput v-model="row.comment" placeholder="请输入" />-->
<!--              </ElFormItem>-->
<!--              <span v-if="!XEUtils.includes(editIds, row.id)">{{ row.comment }}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </ElTableColumn>-->
<!--        <ElTableColumn align="center" fixed="right" label="操作" width="90">-->
<!--          <template #default="{ row }">-->
<!--            <ElButton plain size="small" title="删除" type="danger" @click.stop="onDel(row)">-->
<!--              <SvgIcon name="ep:delete" />-->
<!--            </ElButton>-->
<!--          </template>-->
<!--        </ElTableColumn>-->
<!--      </ElTable>-->
<!--      <ElButton @click="toSave">-->
<!--        {{ t('common.saveText') }}-->
<!--      </ElButton>-->
<!--    </ElForm>-->
<!--  </div>-->
<!--</template>-->

<!--<style lang="scss" scoped>-->
<!--.el-button + .el-button {-->
<!--  margin-left: 4px;-->
<!--}-->

<!--.required-icon {-->
<!--  display: inline-block;-->
<!--  color: var(&#45;&#45;vxe-table-validate-error-color);-->
<!--  width: 0.8em;-->
<!--  height: 1em;-->
<!--  line-height: 1em;-->
<!--  font-family: var(&#45;&#45;vxe-icon-font-family);-->
<!--  font-weight: 400;-->
<!--  position: relative;-->

<!--  &::after {-->
<!--    content: "*";-->
<!--    position: absolute;-->
<!--    left: 0;-->
<!--    top: 0.1em;-->
<!--    color: var(&#45;&#45;el-color-danger);-->

<!--  }-->
<!--}-->

<!--.edit-column {-->
<!--  //display: flex;-->
<!--  //align-items: center;-->
<!--  //justify-content: center;-->
<!--  .el-form-item {-->
<!--    //margin-bottom: 0;-->
<!--  }-->

<!--}-->

<!--.form-table-edit {-->
<!--  :deep(.el-table__row) {-->
<!--    .col&#45;&#45;dirty {-->
<!--      &:before {-->
<!--        content: "";-->
<!--        top: -5px;-->
<!--        left: -5px;-->
<!--        bottom: unset;-->
<!--        position: absolute;-->
<!--        border-width: 5px;-->
<!--        border-style: solid;-->
<!--        border-color: transparent #f56c6c transparent transparent;-->
<!--        transform: rotate(45deg);-->
<!--      }-->
<!--    }-->

<!--    &.row&#45;&#45;new > .el-table__cell:before {-->
<!--      content: "";-->
<!--      top: -5px;-->
<!--      left: -5px;-->
<!--      bottom: unset;-->
<!--      position: absolute;-->
<!--      border-width: 5px;-->
<!--      border-style: solid;-->
<!--      border-color: transparent #19a15f transparent transparent;-->
<!--      transform: rotate(45deg);-->
<!--    }-->

<!--  }-->
<!--  //-->
<!--  //:deep(.el-table__body-wrapper) {-->
<!--  //  td {-->
<!--  //      &.el-table-fixed-column&#45;&#45;right, &.el-table-fixed-column&#45;&#45;left {-->
<!--  //        &.is-last-column:before {-->
<!--  //          bottom: 66px;-->
<!--  //        }-->
<!--  //      }-->
<!--  //  }-->
<!--  //}-->
<!--}-->
<!--</style>-->
