<script setup lang="ts">
defineOptions({
  name: 'Iconpicker',
})
const icon = ref('')
const icon1 = ref('ep:success-filled')
const icon2 = ref('')
</script>

<template>
  <div>
    <KPageHeader title="图标选择器" content="KIconPicker" />
    <KPageMain>
      <div mb4>
        <KIconPicker v-model="icon" />
      </div>
      <div>
        <KIconPicker v-model="icon1" />
      </div>
    </KPageMain>
    <KPageMain title="尺寸">
      <!--        <KIconPicker v-model="icon2" size="small" /> -->
      <KIconPicker v-model="icon2">
        <template #default="{ icon: icon3 }">
          <div class="flex-center-start inline-flex cursor-pointer gap-2 border rounded-full px-3 py-1">
            <KIcon v-if="icon" :name="icon3" />
            <div v-else class="text-sm">
              {{ icon || '请选择图标' }}
            </div>
          </div>
        </template>
      </KIconPicker>
    </KPageMain>
  </div>
</template>
