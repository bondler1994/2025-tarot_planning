<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { requiredRule } from '@/features/validateRules.js'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'
import InputBoxRadio from '@/components/InputBoxRadio.vue'
import InputBox from '@/components/InputBox.vue'

const router = useRouter()

const googleUpdateData = ref({
  name: '',
  gender: '',
  birthdate: '',
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
    return googleUpdateData.value.birthdate.split('-').join('/')
  },
  set(date) {
    googleUpdateData.value.birthdate = date.split('/').join('-')
  },
})

const dialog = ref(false)

function openDialog() {
  dialog.value = true
}

async function onSubmit() {
  console.log(googleUpdateData.value)

  const payload = googleUpdateData.value

  try {
    const res = await tarotDiaryAPI.PUT('/api/oauth/google/setup', payload)
    console.log(res)

    router.push({ name: 'registerSuccess' })
  } catch (error) {
    console.log(error)
    openDialog()
  }
}
</script>

<template>
  <div class="register column content-center">
    <div class="register__title">
      <div class="title">帳號即將建立完成</div>
    </div>
    <div class="register__description">
      <div class="description">為了讓您在塔羅聊癒日記的體驗更加完整，請協助填寫下列資訊：</div>
    </div>
    <div class="register__update-form">
      <q-form class="form" @submit="onSubmit">
        <InputBox title="暱稱" v-model="googleUpdateData.name" :rules="[requiredRule]"></InputBox>

        <InputBoxRadio
          title="性別"
          v-model="googleUpdateData.gender"
          :rules="[requiredRule]"
          :options="genderOptions"
        ></InputBoxRadio>

        <InputBox title="生日" v-model="birthdate" :rules="[requiredRule]">
          <q-icon name="event" class="cursor-pointer" size="20px">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="birthdate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </InputBox>

        <div class="button-group row justify-center">
          <div class="button--blank"></div>
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

  padding: 36px 24px;

  width: 322px;

  gap: 28px;
}

.title {
  font-size: font.$custom-h2;
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
}

.button {
  width: 96px;
  height: 40px;
  border-radius: 24px;
  font-size: 15px;

  &--blank {
    @extend .button;
  }
}
</style>
