<template>
    <div class="my-biz-counter">
      <div class="num-value">{{ num }}</div>
      <div @click="onClick">点击减1</div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  const num = ref<number>(100);
  const onClick = () => {
    num.value += 1;
  };
  </script>