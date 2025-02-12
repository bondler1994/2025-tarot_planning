<script setup>
import { ref } from 'vue'
import { computed } from 'vue'

import tarotDiaryAPI from '@/features/tarotDiaryAPI'

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

async function onSubmit() {
  console.log(memberData.value)

  const payload = memberData.value

  try {
    const res = await tarotDiaryAPI.POST('/api/auth/register', payload)
    console.log(res)

  } catch (error) {
    console.log(error)
  }
}

async function loginGoogle() {
  try {
    const res = await tarotDiaryAPI.GET('/api/oauth/google/redirect')
    console.log(res)

  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <QLayout view="hHh lpr fff">
    <QPageContainer class="fit row justify-center">
      <QPage padding class="column justify-center">
        <div class="column justify-center q-pa-md q-gutter-y-sm" style="width: 350px">
          <p class="text-h6 text-center text-weight-bold">註冊新會員</p>

          <QForm @submit="onSubmit">
            <p class="q-mt-md q-mb-sm">使用者名稱</p>
            <QInput
              filled
              v-model="memberData.name"
              label="您的使用者名稱"
              hint="中、英文皆可"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '必填']"
            ></QInput>

            <p class="q-mt-md q-mb-sm">Email</p>
            <QInput
              v-model="memberData.email"
              filled
              type="email"
              label="您的 Email"
              hint="alice@example.com"
              lazy-rules
              :rules="['email' || '必填']"
            ></QInput>

            <p class="q-mt-md q-mb-sm">密碼</p>
            <QInput
              v-model="memberData.password"
              filled
              :type="isPwd ? 'password' : 'text'"
              label="您的密碼"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '必填']"
            >
              <template v-slot:append>
                <QIcon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </QInput>

            <p class="q-mt-md q-mb-sm">性別</p>
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

            <p class="q-mt-md q-mb-sm">生日</p>
            <QInput filled v-model="birthdate" :rules="['date']">
              <template v-slot:append>
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
            <div class="column justify-center">
              <QBtn padding="md" label="註冊" type="submit" color="primary" />
            </div>
          </QForm>

          <p class="q-mt-lg text-center">或是</p>

          <QBtn padding="md" no-caps @click="loginGoogle">
            <QIcon left size="1.5em" name="fa-brands fa-google"></QIcon>
            <div>使用 Google 帳戶登入</div>
          </QBtn>
        </div>
        <pre>{{ memberData }}</pre>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss" scoped></style>
