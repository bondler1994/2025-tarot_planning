<script setup></script>

<template>
  <div class="register column content-center">
    <div class="register__title">
      <div class="title">建立成功</div>
    </div>
    <div class="register__description">
      <div class="description">請至信箱點擊驗證信件中的網址，驗證完成後即可成功建立會員。</div>
    </div>
    <div class="register__image">
      <div class="image">
        <img src="https://fakeimg.pl/274x100/" alt="register success" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss';
.register {
  background-color: $grey-4;

  padding: 24px;

  width: 322px;

  gap: 24px;
}

.title {
  font-size: font.$custom-h2;
}

.description {
  font-size: font.$custom-h6;
}
</style>
