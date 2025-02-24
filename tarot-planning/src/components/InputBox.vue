<script setup>
import { useTemplateRef, ref, computed } from 'vue'
import ValidateSign from './ValidateSign.vue'
import EditSign from './EditSign.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  needSignSpace: {
    type: Boolean,
    default: true,
  },
  hasSign: {
    type: Boolean,
    default: false,
  },
  sign: {
    type: String,
    default: 'validate',
  },
  rules: {
    type: Array,
    default: [],
  },
  hint: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  disable: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:disable'])

const value = defineModel()

const isStartValidate = ref(false)

const qInputDOM = useTemplateRef('qInputDOM')

function onBlur() {
  isStartValidate.value = true
}
</script>

<template>
  <div class="input-box row items-center">
    <div class="input-box__label">
      <div class="label">{{ title }}</div>
    </div>
    <div class="input-box__body">
      <q-input
        :type="type"
        standout
        square
        color="white"
        bg-color="grey-6"
        class="input"
        :class="sign !== 'edit' ? '' : disable ? '' : 'input--focus'"
        v-model="value"
        :rules="rules"
        lazy-rules
        :hint="hint"
        no-error-icon
        ref="qInputDOM"
        @blur.once="onBlur"
        :disable="disable"
      >
        <template #append>
          <slot></slot>
        </template>
      </q-input>
    </div>
    <div v-if="needSignSpace" class="input-box__valid-sign">
      <div v-if="hasSign">
        <ValidateSign
          v-if="sign === 'validate'"
          :isStartValidate="isStartValidate"
          :hasError="qInputDOM?.hasError"
        ></ValidateSign>

        <EditSign
          v-if="sign === 'edit'"
          @update:disable="emits('update:disable', $event)"
        ></EditSign>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss';
.input-box {
  gap: 8px;

  &__label {
    width: 32px;
  }

  &__body {
    flex: 1;
    height: 32px;
  }

  &__valid-sign {
    width: 24px;
    height: 24px;
  }
}

:deep(.input--focus .q-field__control) {
  border: 2px solid $black;
}

:deep(.input .q-field__control),
:deep(.input .q-field__marginal) {
  height: 32px;
}

:deep(.q-field__messages) {
  font-size: 12px;
}
:deep(.q-field__bottom) {
  padding-left: 0;
}
.label {
  font-size: font.$custom-h6;
}

.valid-sign {
  width: 24px;
  height: 24px;
  background-color: $white;
  border-radius: 50%;
}
</style>
