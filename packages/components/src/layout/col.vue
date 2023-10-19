<template>
  <div :class="{ [baseClassName]: true, [spanClassName]: true }">
    <slot v-if="$slots.default"> </slot>
  </div>
</template>

<script lang="ts" setup>
import { prefixName } from '../theme';
const props = defineProps<{
  span: number;
}>();

function getSpan(propsSpan: number | undefined): number {
  if (typeof propsSpan === 'number') {
    const span = Math.ceil(Number(propsSpan));
    if (span >= 1 && span <= 24) {
      return span;
    }
  }
  return 1;
}

const baseClassName = `${prefixName}-col`;
const spanClassName = `${baseClassName}-${getSpan(props.span)}`;
</script>
