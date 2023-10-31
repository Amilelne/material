<template>
  <div :class="{ [baseClassName]: true }">
    <Form
      ref="formRef"
      :model="internalModel"
      @finish="onFinish"
      @finishFail="onFinishFail"
    >
      <FormItem
        v-for="(field, index) in fieldList"
        :key="index"
        :label="field.label"
        :name="field.name"
        :rule="field.rule"
      >
        <component
          :is="registerComponentMap[field.fieldType]"
          :value="internalModel[field.name]"
          :options="field.options || []"
          @change="(value: unknown) => { onFieldChange({name: field.name, value})}"
        ></component>
      </FormItem>
      <Row v-if="$slots.default">
        <slot></slot>
      </Row>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { prefixName } from '../theme';
import { Row } from '../layout';
import Form from '../form';
import Input from '../input';
import RadioList from '../radio-list';
import type { Component } from 'vue';
import type { DynamicFormField } from './type';

const registerComponentMap: { [key: string]: Component } = {
  Input: Input,
  InputPassword: Input.Password,
  RadioList: RadioList,
};

const props = withDefaults(
  defineProps<{
    fieldList?: DynamicFormField[];
    model?: { [name: string]: unknown };
  }>(),
  {}
);

const internalModel = reactive<{ [name: string]: unknown }>(props?.model || {});
const FormItem = Form.FormItem;
const baseClassName = `${prefixName}-dynamic-form`;

const onFieldChange = (event: { name: string; value: string | unknown }) => {
  internalModel[event.name] = event.value;
};

const emits = defineEmits<{
  (event: 'finish', e: unknown): void;
  (event: 'finishFail', e: unknown): void;
}>();

const onFinish = (e: unknown) => {
  emits('finish', e);
};

const onFinishFail = (e: unknown) => {
  emits('finishFail', e);
};

const registerFieldComponent = (name: string, component: Component) => {
  registerComponentMap[name] = component;
};

defineExpose({
  registerFieldComponent,
});
</script>
