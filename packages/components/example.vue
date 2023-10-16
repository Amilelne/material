<template>
  <div class="example">
    <Button :type="'success'" @click="openMessage('success')">success message</Button>
    <Button :type="'primary'" @click="openMessage('info')">info message</Button>
    <Button :type="'warning'" @click="openMessage('warn')">warn message</Button>
    <Button :type="'primary'" @click="openDialog">open dialog</Button>
    <div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, Button, Dialog } from './src';
const openMessage = (type: any) => {
  Message.open({
    text: type,
    type: type,
    duration: 1000,
  });
};

const openDialog = () => {
  const dialogEle = Dialog.createDialog({
    text: 'This is a Dialog',
    onOk: () => {
      console.log("open a dialog");
      dialogEle.close();
    }
  })
}
</script>

<style>
.example {
  height: 100%;
  padding: 100px;
  box-sizing: border-box;
  text-align: center;
}
</style>
