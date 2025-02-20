<script setup>
import { ref } from 'vue'

const showingMenu = ref(false)
</script>

<template>
  <q-header class="header">
    <q-toolbar>
      <q-btn
        v-if="showingMenu === false"
        flat
        dense
        icon="fa-solid fa-bars"
        class="toggler btn--no-hover q-mr-sm"
        color="black"
        size="lg"
        @click="showingMenu = true"
      />
      <q-btn
        v-else
        flat
        dense
        icon="fa-solid fa-xmark"
        class="toggler btn--no-hover q-mr-sm"
        color="black"
        size="lg"
        @click="showingMenu = false"
      />

      <div class="header__logo">
        <div class="logo"></div>
      </div>
    </q-toolbar>
  </q-header>

  <div :class="showingMenu ? 'menu' : 'menu--no-show'">
    <q-list class="menu__body column items-center justify-between q-pa-lg">
      <div class="menu-item">
        <q-item clickable>
          <q-item-section>
            <RouterLink :to="{ name: 'member' }" @click="showingMenu = false">塔羅日記</RouterLink>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <RouterLink :to="{ name: 'statistics' }" @click="showingMenu = false"
              >日記統計</RouterLink
            >
          </q-item-section>
        </q-item>
      </div>

      <div class="menu-item">
        <q-item clickable>
          <q-item-section>
            <RouterLink :to="{ name: 'member-edit' }" @click="showingMenu = false"
              >會員資料</RouterLink
            >
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>

  <q-page-container class="member">
    <q-page>
      <RouterView />
    </q-page>
  </q-page-container>
</template>

<style lang="scss" scoped>
.header {
  height: 64px;

  background-color: $grey-4;

  display: flex;

  :deep(.q-btn.btn--no-hover .q-focus-helper) {
    display: none;
  }

  &__logo {
    padding-left: calc(50% - 45.69px - 8px - 48px);
  }

  &--no-toggler {
    .header__logo {
      padding-left: calc(50% - 48px);
    }
  }
}

.logo {
  width: 96px;
  height: 48px;
  border-radius: 12px;
  background-color: $blue-5;
  cursor: pointer;
}

.menu {
  position: fixed;
  top: 64px;
  left: 0;

  width: 100%;
  height: calc(100vh - 64px);

  background-color: $grey-4;

  z-index: 1;

  opacity: 1;
  transition:
    opacity 0.5s,
    z-index 0s;

  &--no-show {
    @extend .menu;

    z-index: -1;
    opacity: 0;
    transition:
      opacity 0.5s,
      z-index 0s 0.5s;
  }

  &__body {
    height: 100%;
  }
}

.menu-item {
  width: 100%;

  text-align: center;
  font-size: 32px;
}

.member {
  background-color: $grey-2;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
