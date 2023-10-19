<template>
  <form :class="{ [className]: true }" @submit="handleSubmit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { reactive, provide, toRaw } from 'vue';
import { prefixName } from '../theme/index';
import { FORM_CONTEXT_KEY } from './type';
import type { FormContext, FormItemContext, ValidateResult } from './type';

const className = `${prefixName}-form`;
const props = defineProps<{ model?: FormContext['model'] }>();

const fieldList: FormItemContext[] = [];

const addField = (field: FormItemContext) => {
  fieldList.push(field);
};

const resetFields = () => {
  fieldList.forEach((field) => {
    field?.resetField?.();
  });
};

const formContext = reactive<FormContext>({
  model: props.model,
  addField,
  resetFields,
});

provide<FormContext>(FORM_CONTEXT_KEY, formContext);

defineExpose({
  addField,
  resetFields,
});

const emits = defineEmits<{
  (event: 'submit', e: Event): void;
  (event: 'finish', e: unknown): void;
  (event: 'finishFail', e: unknown): void;
}>();

const validateFields = async () => {
  const errorList: ValidateResult[] = [];
  for (let i = 0; i < fieldList.length; i++) {
    const field = fieldList[i];
    const result = await field?.validateField?.();
    if (result?.hasError) {
      errorList.push(result);
    }
  }
  return errorList;
};

const handleSubmit = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
  emits('submit', e);
  if (props.model) {
    validateFields()
      .then((errorList) => {
        if (errorList.length) {
          emits('finishFail', errorList);
        } else {
          emits('finish', toRaw(props.model));
        }
      })
      .catch((e) => {
        emits('finishFail', e);
      });
  }
};
</script>
