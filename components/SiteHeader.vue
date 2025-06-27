<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const itemsLeft = [
  { label: "Home", to: "/", icon: "i-heroicons-home" },
  { label: "Blog", to: "/blog", icon: "i-heroicons-book-open" },
  // { label: "Projects", to: "/projects", icon: "i-heroicons-briefcase" },
  // { label: "Uses", to: "/uses", icon: "i-heroicons-cog" },
];

const itemsRight = [
  { label: "GitHub", icon: "i-simple-icons-github", to: "https://github.com/koko1108", target: "_blank" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-gray-100 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 桌面版導航 -->
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center space-x-3">
            <img class="h-8 w-8" src="/logo.png" alt="Logo" />
            <span class="text-lg font-bold">Koko's</span>
          </div>
          
          <!-- 桌面版選單 - 隱藏在 md 以下 -->
          <div class="hidden md:block">
            <UNavigationMenu
              color="neutral"
              variant="link"
              :items="itemsLeft"
              class="ml-10"
            />
          </div>
        </div>

        <!-- 桌面版右側選單 - 隱藏在 md 以下 -->
        <div class="hidden md:block">
          <UNavigationMenu
            color="neutral"
            variant="link"
            :items="itemsRight"
          />
        </div>

        <!-- 手機版漢堡選單按鈕 - 顯示在 md 以下 -->
        <div class="md:hidden">
          <UButton
            color="neutral"
            variant="outline"
            @click="toggleMenu"
            :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            size="xl"
          />
        </div>
      </div>

      <!-- 手機版下拉選單 -->
      <div v-show="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
          <!-- 手機版左側選單 -->
          <UNavigationMenu
            color="neutral"
             orientation="vertical"
            variant="link"
            :items="itemsLeft"
            class="text-3xl"
          />
          
          <!-- 分隔線 -->
          <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
          
          <!-- 手機版右側選單 -->
          <div v-for="item in itemsRight" :key="item.label" class="block">
            <ULink
              :to="item.to"
              :target="item.target"
              class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              @click="isMenuOpen = false"
            >
              <UIcon :name="item.icon" class="mr-2" />
              {{ item.label }}
            </ULink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
