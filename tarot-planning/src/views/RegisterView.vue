<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import tarotDiaryAPI from '@/features/tarotDiaryAPI'
import InputBox from '@/components/InputBox.vue'
import BtnGoogleLogin from '@/components/BtnGoogleLogin.vue'
import DialogResponse from '@/components/DialogResponse.vue'

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
  <div class="column content-center">
    <div class="column justify-center q-pa-md q-gutter-y-sm" style="width: 350px">
      <p class="text-h6 text-center text-weight-bold">註冊新會員</p>

      <QForm class="q-gutter-y-lg" @submit="onSubmit">
        <InputBox title="暱稱">
          <QInput
            filled
            label="您的暱稱"
            hint="中、英文皆可"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '必填']"
            v-model="memberData.name"
          >
          </QInput>
        </InputBox>

        <InputBox title="Email">
          <QInput
            filled
            label="您的 Email"
            hint="alice@example.com"
            lazy-rules
            :rules="['email' || '必填']"
            v-model="memberData.email"
          >
          </QInput>
        </InputBox>

        <InputBox title="密碼">
          <QInput
            filled
            label="您的密碼"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '必填']"
            v-model="memberData.password"
          >
            <template #append>
              <QIcon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </QInput>
        </InputBox>

        <InputBox title="性別">
          <QField borderless v-model="memberData.gender" :rules="[(val) => !!val || '必填']">
            <template v-slot:control>
              <div class="q-gutter-x-sm">
                <QOptionGroup
                  v-model="memberData.gender"
                  :options="genderOptions"
                  color="primary"
                  inline
                />
              </div>
            </template>
          </QField>
        </InputBox>

        <InputBox title="生日">
          <QInput filled label="您的生日" lazy-rules :rules="['date']" v-model="birthdate">
            <template #append>
              <QIcon name="event" class="cursor-pointer">
                <QPopupProxy cover transition-show="scale" transition-hide="scale">
                  <QDate v-model="birthdate">
                    <div class="row items-center justify-end">
                      <QBtn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </QDate>
                </QPopupProxy>
              </QIcon>
            </template>
          </QInput>
        </InputBox>

        <div class="column justify-center">
          <QBtn padding="md" label="註冊" type="submit" color="primary" />
        </div>
      </QForm>

      <p class="q-mt-lg text-center">或是</p>

      <BtnGoogleLogin></BtnGoogleLogin>

      <QDialog v-model="dialog" position="top" @hide="redirect">
        <QCard style="width: 350px">
          <QCardSection v-if="response === 'success'" class="row items-center no-wrap">
            <QIcon class="q-pr-xs" name="done" size="sm" color="positive"></QIcon>
            <div class="text-weight-bold">註冊成功</div>
          </QCardSection>

          <QCardSection v-else class="row items-center no-wrap">
            <QIcon class="q-pr-xs" name="error" size="sm" color="negative"></QIcon>
            <div class="text-weight-bold">連線失敗</div>
          </QCardSection>
        </QCard>
      </QDialog>
    </div>
    <pre>{{ memberData }}</pre>
  </div>
</template>

<style lang="scss" scoped></style>
