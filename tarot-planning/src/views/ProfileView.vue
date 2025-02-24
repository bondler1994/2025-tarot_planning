<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  requiredRule,
  passwordRule,
  passwordConfirmRule,
  emailRule,
} from '@/features/validateRules.js'
import { useProfileStore } from '@/stores/profileStore.js'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'
import InputBoxRadio from '@/components/InputBoxRadio.vue'
import InputBox from '@/components/InputBox.vue'

const router = useRouter()
const profileStore = useProfileStore()

const newProfileData = ref({
  name: profileStore.profile.name,
  password: profileStore.profile.password,
  gender: profileStore.profile.gender,
  birthdate: profileStore.profile.birthdate,
})

const passwordConfirm = ref('')

const isDisable = ref({
  email: true,
  name: true,
  password: true,
  gender: true,
  birthdate: true,
})

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
    return newProfileData.value.birthdate.split('-').join('/')
  },
  set(date) {
    newProfileData.value.birthdate = date.split('/').join('-')
  },
})

const isEdited = computed(() => {
  return Object.values(isDisable.value).some((val) => val === false)
})

const isSuccess = ref(false)

const dialog = ref(false)

function openDialog() {
  dialog.value = true
}

async function onSubmit() {
  console.log(newProfileData.value)

  const payload = newProfileData.value

  try {
    const res = await tarotDiaryAPI.PUT('/api/auth/update', payload)
    console.log(res)

    profileStore.profile = { ...profileStore.profile, ...payload }

    isSuccess.value = true
    openDialog()
  } catch (error) {
    console.log(error)

    isSuccess.value = false
    openDialog()
  }
}

function onHide() {
  if (isSuccess.value) {
    router.push({ name: 'member' })
  }
}
</script>

<template>
  <div class="profile column content-center">
    <div class="profile__title">
      <div class="title">會員資料</div>
    </div>
    <div class="profile__form">
      <q-form class="form" @submit="onSubmit">
        <InputBox
          title="帳號"
          :hasSign="false"
          v-model="profileStore.profile.email"
          :rules="[emailRule]"
          :disable="isDisable.email"
        ></InputBox>

        <InputBox
          title="密碼"
          type="password"
          :hasSign="true"
          sign="edit"
          :disable="isDisable.password"
          @update:disable="isDisable.password = $event"
          v-model="newProfileData.password"
          :rules="[passwordRule]"
        ></InputBox>

        <InputBox
          v-if="!isDisable.password"
          type="password"
          :hasSign="true"
          sign="edit"
          v-model="passwordConfirm"
          :rules="[(val) => passwordConfirmRule(val, newProfileData.password)]"
        ></InputBox>

        <InputBox
          title="暱稱"
          :hasSign="true"
          sign="edit"
          :disable="isDisable.name"
          @update:disable="isDisable.name = $event"
          v-model="newProfileData.name"
          :rules="[requiredRule]"
        ></InputBox>

        <InputBoxRadio
          title="性別"
          v-model="newProfileData.gender"
          :rules="[requiredRule]"
          :options="genderOptions"
          :disable="isDisable.gender"
        ></InputBoxRadio>

        <InputBox
          title="生日"
          v-model="birthdate"
          :rules="[requiredRule]"
          :disable="isDisable.birthdate"
        >
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

        <div v-if="isEdited" class="button-group row justify-center">
          <RouterLink :to="{ name: 'member' }">
            <q-btn class="button" label="取消" color="grey-2" unelevated />
          </RouterLink>
          <q-btn class="button" label="確認" type="submit" color="grey-7" unelevated />
        </div>
      </q-form>
    </div>

    <q-dialog v-model="dialog" position="top" @hide="onHide">
      <q-card style="width: 350px">
        <q-card-section v-if="isSuccess" class="row items-center no-wrap">
          <q-icon class="q-pr-xs" name="check_circle" size="sm" color="positive"></q-icon>
          <div class="text-weight-bold">更新成功</div>
        </q-card-section>

        <q-card-section v-else class="row items-center no-wrap">
          <q-icon class="q-pr-xs" name="error" size="sm" color="negative"></q-icon>
          <div class="text-weight-bold">連線失敗</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss';
.profile {
  background-color: $grey-4;

  padding: 24px;

  width: 322px;

  gap: 28px;
}

.title {
  font-size: font.$custom-h4;
  line-height: 40px;
}

.description {
  font-size: font.$custom-h6;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.button-group {
  gap: 54px;

  padding-top: 60px;
}

.button {
  width: 96px;
  height: 40px;
  border-radius: 24px;
  font-size: 15px;
}
</style>
