<template>
    <div class="example">
      <div>这是开发模式下的 业务组件</div>
      <Counter />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Counter } from './src';
  </script>
  
  <style>
  .example {
    height: 100%;
    padding: 100px;
    box-sizing: border-box;
    text-align: center;
  }
  </style>