<script setup>
import { useTemplateRef, ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  hasSign: {
    type: Boolean,
    default: false,
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
})

const value = defineModel()

const isStartValidate = ref(false)

const qInputDOM = useTemplateRef('qInputDOM')

const hasInputError = computed(() => {
  if (qInputDOM.value?.hasError) {
    return 'failed'
  } else {
    return 'pass'
  }
})

function onBlur() {
  isStartValidate.value = true
}

// const valueValid = ref('')
// function onBlur() {
//   if (qInputDOM.value?.hasError) {
//     valueValid.value = 'failed'
//   } else {
//     valueValid.value = 'pass'
//   }
// }
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
        v-model="value"
        :rules="rules"
        lazy-rules
        :hint="hint"
        no-error-icon
        ref="qInputDOM"
        @blur.once="onBlur"
      >
        <template #append>
          <slot></slot>
        </template>
      </q-input>
    </div>
    <div class="input-box__valid-sign">
      <div v-if="hasSign">
        <div v-if="!isStartValidate" class="valid-sign"></div>
        <q-icon
          v-if="isStartValidate && hasInputError === 'pass'"
          name="check_circle"
          size="24px"
          color="positive"
        ></q-icon>
        <q-icon
          v-if="isStartValidate && hasInputError === 'failed'"
          name="highlight_off"
          size="24px"
          color="negative"
        ></q-icon>

        <!-- <div v-if="valueValid === ''" class="valid-sign"></div>
        <q-icon
          v-if="valueValid === 'pass'"
          name="check_circle"
          size="24px"
          color="positive"
        ></q-icon>
        <q-icon
          v-if="valueValid === 'failed'"
          name="highlight_off"
          size="24px"
          color="negative"
        ></q-icon> -->
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
    // font-size: 0;
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
