<script setup>
import { useTemplateRef, ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  rules: {
    type: Array,
    default: [],
  },
  hint: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
})

const value = defineModel()
</script>

<template>
  <div class="input-box row items-center">
    <div class="input-box__label">
      <div class="label">{{ title }}</div>
    </div>
    <div class="input-box__body">
      <q-field class="input" borderless dense v-model="value" :rules="rules" no-error-icon>
        <template v-slot:control>
          <div class="option" v-for="(option, index) in options" :key="index">
            <input
              class="option__input"
              type="radio"
              :id="option.value"
              v-model="value"
              :value="option.value"
            />
            <label class="option__label" :for="option.value">{{ option.label }}</label>
          </div>
        </template>
      </q-field>
    </div>
    <div class="input-box__valid-sign"></div>
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

:deep(.input .q-field__control),
:deep(.input .q-field__marginal),
:deep(.input.q-field--auto-height.q-field--dense .q-field__native) {
  min-height: 32px;
}

:deep(.input .q-field__native.row) {
  gap: 8px;
}

.option {
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;

  &__input {
    appearance: none;

    cursor: pointer;
    width: 16px;
    height: 16px;
    background-color: $white;

    border: 0 solid $grey-6;
    transition: border 0.2s;
  }

  &__input:checked {
    border: 8px solid $grey-6;
  }

  &__label {
    font-size: font.$custom-h6;
    cursor: pointer;
  }
}

:deep(.q-field__messages) {
  font-size: 12px;
}

:deep(.q-field__bottom) {
  padding-top: 4px;
  padding-left: 0;
}

.option-group {
  font-size: font.$custom-h6;
}

.label {
  font-size: font.$custom-h6;
}
</style>
