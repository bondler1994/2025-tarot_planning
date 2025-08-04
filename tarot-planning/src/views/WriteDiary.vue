<script setup>
import { ref, computed } from 'vue'
// import { useCardStore } from '@/stores/cardDataStore'
import { useDiaryStore } from '@/stores/diaryStore'
import { useRouter } from 'vue-router'

// const cardStore = useCardStore()
const cardData = ref({})
cardData.value = JSON.parse(localStorage.getItem('cardData'))

const isUpRight = computed(() => {
  return cardData.value.is_upright ? '正位' : '逆位'
})

const text = ref('')

const register = ref(false)

function openRegisterDialog() {
  register.value = true
}
const diaryStore = useDiaryStore()
const router = useRouter()

function handleJoinMemberClick() {
  const payload = {
    tarot_card: {
      tarot_id: cardData.value.tarot_id,
      image: cardData.value.image,
      name: cardData.value.name,
      is_upright: cardData.value.is_upright,
      blessing_message: cardData.value.message,
    },
    user_entry_text: text.value,
    created_at: cardData.value.created_at,
  }
  diaryStore.setDiaryInfo(payload)
  router.push({ name: 'register' })
}
</script>

<template>
  <div class="layout">
    <main>
      <div class="diary-block">
        <div class="card">
          <div class="card__img" :class="cardData.is_upright ? '' : 'reversed'">
            <img :src="cardData.image" alt="" />
          </div>
          <div class="card__info info">
            <h4 class="info__title">{{ cardData.name }} - {{ isUpRight }}</h4>
            <p class="info__content">{{ cardData.message }}</p>
          </div>
        </div>
        <div class="diary">
          <div class="q-pa-md">
            <q-input
              class="textarea"
              type="textarea"
              input-class="my-textarea"
              v-model="text"
              placeholder="寫下自己今天的心情吧！"
              :filled="false"
              borderless
              autogrow
              maxlength="300"
              label-color="white"
            />
          </div>
        </div>
      </div>
      <div class="">
        <q-btn @click="openRegisterDialog" class="save-btn" color="blue-5"
          ><h4>儲存並分享 ></h4></q-btn
        >
      </div>
    </main>
    <q-dialog v-model="register">
      <div class="register">
        <p class="register__content">
          不想遺漏你的日記嗎？<br />加入會員就可以每天瀏覽過去的日記，更可以跟大家分享你每天的生活喔！
        </p>
        <div class="register__button">
          <q-btn class="btn" color="blue-5" @click="handleJoinMemberClick"><h4>加入會員</h4></q-btn>
          <q-btn class="btn" color="grey-2" v-close-popup><h4>取消</h4></q-btn>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss' as *;
@use '@/assets/sass/button.scss' as *;

.layout {
  height: 100dvh;
  position: relative;
  background-color: $blue-2;
}

main {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
.diary-block {
  width: 322px;
  border: 8px solid $blue-7;
  border-radius: 16px;
  margin: auto;
  background-color: $yellow-1;
  overflow: hidden;
}

.card {
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  background-color: $yellow-3;

  &__img {
    flex: 0 1 64px;
    margin: auto;

    &.reversed {
      transform: rotate(180deg);
    }

    img {
      width: 100%;
    }
  }

  &__info {
    flex: 1 1 60%;

    h4,
    p {
      margin: 0;
    }

    h4 {
      font-size: $custom-h4;
      font-weight: $semi-bold;
    }

    p {
      margin-top: 8px;
    }
  }
}

.diary {
  .textarea {
    font-size: $custom-h6;
    font-weight: 400;
  }

  :deep(.my-textarea) {
    resize: none;
    padding: 0;
  }

  .fake-content {
    font-size: $custom-h6;
    line-height: 18px;
    font-weight: 400;
    letter-spacing: 0.00937em;
    min-height: 52px;
    margin: 2.5px 0 2.5px;
    word-break: break-word;
    white-space: pre-wrap;
  }
}

.save-btn {
  @include button;

  h4 {
    margin: 0;
    font-size: $custom-h4;
    font-weight: $semi-bold;
  }
}

.register {
  width: 272px;
  padding: 33px 28px 16px;
  background-color: $blue-2;
  border: 8px solid $blue-7;
  border-radius: 16px;
  text-align: center;

  &__content {
    font-size: $custom-h6;
    line-height: 24px;
    margin: 0 0 50px;
  }

  &__button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .btn {
      @include button;

      padding: 0;
      width: 128px;
      height: 40px;

      h4 {
        font-size: $custom-h4;
        font-weight: $semi-bold;
        margin: 0;
      }
    }
  }
}
</style>
