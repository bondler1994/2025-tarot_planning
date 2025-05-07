<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'
import InputBox from '@/components/InputBox.vue'
import BtnGoogleLogin from '@/components/BtnGoogleLogin.vue'

const router = useRouter()

const loginData = ref({
  email: '',
  password: '',
})

const dialog = ref(false)

function openDialog() {
  dialog.value = true
}

function requiredRule(val) {
  if (!(val && val.length > 0)) {
    return '必填'
  }

  return true
}

function emailRule(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return 'email 格式不正確'
  }
  return true
}

async function onSubmit() {
  console.log(loginData.value)

  const payload = loginData.value

  try {
    const res = await tarotDiaryAPI.POST('/api/auth/login', payload)
    console.log(res)

    router.push({ name: 'today-draw' })
  } catch (error) {
    console.log(error)

    openDialog()
  }
}
</script>

<template>
  <div class="login">
    <q-form class="login__form" @submit="onSubmit">
      <InputBox
        title="帳號"
        :needSignSpace="false"
        v-model="loginData.email"
        :rules="[emailRule]"
      ></InputBox>

      <InputBox
        title="密碼"
        :needSignSpace="false"
        v-model="loginData.password"
        :rules="[requiredRule]"
        type="password"
      ></InputBox>

      <div class="button-group row justify-center">
        <RouterLink :to="{ name: 'register' }">
          <q-btn class="button" label="建立會員" color="grey-7" unelevated />
        </RouterLink>
        <q-btn class="button" label="登入" type="submit" color="grey-7" unelevated />
      </div>
    </q-form>

    <div class="login__forget-btn">
      <RouterLink class="forget-btn" :to="{ name: 'forgetPassword' }">忘記密碼</RouterLink>
    </div>

    <div class="login__seperator">
      <div class="seperator"></div>
    </div>

    <div class="login__google-btn">
      <BtnGoogleLogin></BtnGoogleLogin>
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
.login {
  border: 8px solid $black;
  border-radius: 16px;
  background-color: $grey-4;

  width: 322px;
  padding: 56px 16px 58px;

  margin-top: calc(50vh - 64px - 205px);

  &__form {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  &__forget-btn {
    padding: 8px 0 0;
    text-align: center;
  }

  &__seperator {
    padding: 28px 0;
  }

  &__google-btn {
    text-align: center;
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

.forget-btn {
  text-decoration: underline;
  font-size: 12px;
  color: $grey-7;
}

.seperator {
  width: 100%;
  border: 0.5px solid $black;
}
</style>
