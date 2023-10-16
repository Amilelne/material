<template>
  <input :class="baseClassName" v-model="intervalValue" />
</template>

<script lang="ts" setup>
import { ref, toRaw, watch } from 'vue';
import { prefixName } from '../theme/index';
const baseClassName = `${prefixName}-input`;

const props = defineProps<{
  value: string;
  options: Array<{ name: string; value: string }>;
}>();
const emits = defineEmits<{
  (e: 'change', value: string): void;
}>();

const intervalValue = ref<string>(toRaw(props.value));

watch([() => intervalValue.value], ([newValue]) => {
  const changedValue = toRaw(newValue);
  emits('change', changedValue);
});

watch([() => props.value], ([newValue]) => {
  intervalValue.value = toRaw(newValue);
});
</script>
