<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import tarotDiaryAPI from '@/features/tarotDiaryAPI'
import InputBox from '@/components/InputBox.vue'
import BtnGoogleLogin from '@/components/BtnGoogleLogin.vue'

const router = useRouter()

const memberData = ref({
  name: 'A',
  email: 'a@a.com',
  password: 'aaa',
  gender: '',
  birthdate: '2025-02-11',
})

const genderOptions = ref([
  {
    label: '女性',
    value: 'female',
  },
  {
    label: '男性',
    value: 'male',
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

const isPwd = ref(true)
const dialog = ref(false)
const response = ref('')

function openDialog() {
  dialog.value = true
}

async function onSubmit() {
  console.log(memberData.value)

  const payload = memberData.value

  try {
    const res = await tarotDiaryAPI.POST('/api/auth/register', payload)
    console.log(res)
    response.value = 'success'
    openDialog()
  } catch (error) {
    console.log(error)
    response.value = ''
    openDialog()
  }
}

function redirect(response) {
  if (response === 'success') {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="register column content-center">
    <div class="register__form">
      <q-form class="q-gutter-y-lg" @submit="onSubmit">
        <InputBox title="暱稱">
          <q-input
            filled
            label="您的暱稱"
            hint="中、英文皆可"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '必填']"
            v-model="memberData.name"
          >
          </q-input>
        </InputBox>

        <InputBox title="Email">
          <q-input
            filled
            label="您的 Email"
            hint="alice@example.com"
            lazy-rules
            :rules="['email' || '必填']"
            v-model="memberData.email"
          >
          </q-input>
        </InputBox>

        <InputBox title="密碼">
          <q-input
            filled
            label="您的密碼"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '必填']"
            v-model="memberData.password"
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </InputBox>

        <InputBox title="性別">
          <q-field borderless v-model="memberData.gender" :rules="[(val) => !!val || '必填']">
            <template v-slot:control>
              <div class="q-gutter-x-sm">
                <q-option-group
                  v-model="memberData.gender"
                  :options="genderOptions"
                  color="primary"
                  inline
                />
              </div>
            </template>
          </q-field>
        </InputBox>

        <InputBox title="生日">
          <q-input filled label="您的生日" lazy-rules :rules="['date']" v-model="birthdate">
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="birthdate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </InputBox>

        <div class="column justify-center">
          <q-btn padding="md" label="註冊" type="submit" color="primary" />
        </div>
      </q-form>
    </div>

    <div class="column justify-center q-gutter-y-sm">
      <p class="q-mt-lg text-center">或是</p>

      <BtnGoogleLogin></BtnGoogleLogin>

      <q-dialog v-model="dialog" position="top" @hide="redirect">
        <q-card style="width: 350px">
          <q-card-section v-if="response === 'success'" class="row items-center no-wrap">
            <q-icon class="q-pr-xs" name="done" size="sm" color="positive"></q-icon>
            <div class="text-weight-bold">註冊成功</div>
          </q-card-section>

          <q-card-section v-else class="row items-center no-wrap">
            <q-icon class="q-pr-xs" name="error" size="sm" color="negative"></q-icon>
            <div class="text-weight-bold">連線失敗</div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <pre>{{ memberData }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.register {
  background-color: #ced4da;

  padding: 24px;

  width: 402px;

  &__form {
    width: 274px;
  }
}
</style>
