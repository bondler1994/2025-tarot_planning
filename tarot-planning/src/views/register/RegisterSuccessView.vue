<script setup></script>

<template>
  <div class="register column content-center">
    <div class="register__title">
      <div class="title">驗證成功</div>
    </div>
    <div class="register__description">
      <div class="description">請稍等，正在製作你的專屬日記...</div>
      <div class="description">製作完成後會直接跳至會員日記頁面！</div>
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
</style>
