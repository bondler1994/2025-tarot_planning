<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  requiredRule,
  emailRule,
  passwordRule,
  passwordConfirmRule,
  confirmRule,
} from '@/features/validateRules.js'
import { useProfileStore } from '@/stores/profileStore.js'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'
import InputBox from '@/components/InputBox.vue'
import InputBoxRadio from '@/components/InputBoxRadio.vue'

const router = useRouter()
const profileStore = useProfileStore()

const memberData = ref({
  name: '',
  email: '',
  password: '',
  gender: '',
  birthdate: '',
})

const passwordConfirm = ref('')
const consentChecked = ref(false)

const genderOptions = ref([
  {
    label: '男',
    value: 'male',
  },
  {
    label: '女',
    value: 'female',
  },
  {
    label: '其他',
    value: 'other',
  },
])

const birthdate = computed({
  get() {
    return memberData.value.birthdate.split('-').join('/')
  },
  set(date) {
    memberData.value.birthdate = date.split('/').join('-')
  },
})

const consent = ref(false)

const dialog = ref(false)

function openConsent() {
  consent.value = true
}

function openDialog() {
  dialog.value = true
}

async function onSubmit() {
  console.log(memberData.value)

  const payload = memberData.value

  try {
    const res = await tarotDiaryAPI.POST('/api/auth/register', payload)
    console.log(res)

    profileStore.profile = payload

    router.push({ name: 'registerConfirmation' })
  } catch (error) {
    console.log(error)
    openDialog()
  }
}
</script>

<template>
  <div class="register column content-center">
    <div class="register__form">
      <q-form class="form" @submit="onSubmit">
        <InputBox
          title="帳號"
          hint="帳號即為您的 email"
          :hasSign="true"
          v-model="memberData.email"
          :rules="[emailRule]"
          refString="email"
        ></InputBox>

        <InputBox
          title="密碼"
          hint="8~16 位，須包含英文大小寫及數字"
          type="password"
          :hasSign="true"
          v-model="memberData.password"
          :rules="[passwordRule]"
        ></InputBox>

        <InputBox
          type="password"
          :hasSign="true"
          v-model="passwordConfirm"
          :rules="[(val) => passwordConfirmRule(val, memberData.password)]"
        ></InputBox>

        <InputBox title="暱稱" v-model="memberData.name" :rules="[requiredRule]"></InputBox>

        <InputBoxRadio
          title="性別"
          v-model="memberData.gender"
          :rules="[requiredRule]"
          :options="genderOptions"
        ></InputBoxRadio>

        <InputBox title="生日" v-model="birthdate" :rules="[requiredRule]">
          <q-icon name="event" class="cursor-pointer" size="20px">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="birthdate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="確定" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </InputBox>

        <div class="consent-validation">
          <q-field
            class="consent-field"
            borderless
            dense
            v-model="consentChecked"
            :rules="[confirmRule]"
            no-error-icon
          >
            <template v-slot:control>
              <div class="option">
                <input
                  class="option__input"
                  type="checkbox"
                  id="consent"
                  v-model="consentChecked"
                />
                <div class="option__label" @click="openConsent">我同意個人資料使用說明</div>
                <q-dialog v-model="consent">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">個人資料使用說明</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <p v-for="n in 15" :key="n">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus
                        sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea
                        at omnis vel numquam exercitationem aut, natus minima, porro labore.
                      </p>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="關閉" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </template>
          </q-field>
        </div>

        <div class="button-group row justify-center">
          <RouterLink :to="{ name: 'login' }">
            <q-btn class="button" label="取消" color="grey-2" unelevated />
          </RouterLink>
          <q-btn class="button" label="建立會員" type="submit" color="grey-7" unelevated />
        </div>
      </q-form>
    </div>

    <q-dialog v-model="dialog" position="top">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <q-icon class="q-pr-xs" name="error" size="sm" color="negative"></q-icon>
          <div class="text-weight-bold">連線失敗</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss';
.register {
  background-color: $grey-4;

  padding: 48px 24px;

  width: 322px;

  &__form {
    width: 274px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.option {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

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
    text-decoration: underline;
  }
}

.button-group {
  gap: 54px;
}
.button {
  width: 96px;
  height: 40px;
  border-radius: 24px;
  font-size: 15px;
}

.consent-validation {
  height: 32px;
}

:deep(.consent-field .q-field__control) {
  min-height: 32px;
}
:deep(.consent-field .q-field__native) {
  justify-content: center;
  padding: 0;
  min-height: 32px;
}

:deep(.consent-field .q-field__bottom) {
  padding-top: 4px;
  padding-left: 34.5px;
}
:deep(.consent-field .q-field__messages) {
  font-size: 12px;
}
</style>
