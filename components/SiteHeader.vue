<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);

const itemsLeft = [
  { label: "Home", to: "/", icon: "i-heroicons-home" },
  { label: "Blog", to: "/blog", icon: "i-heroicons-book-open" },
  { label: "Projects", to: "/projects", icon: "i-heroicons-briefcase" },
  { label: "Uses", to: "/uses", icon: "i-heroicons-cog" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
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
        <div class="flex gap-2">
          <ClientOnly v-if="!colorMode?.forced">
            <UButton
              :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="neutral"
              variant="outline"
              size="xl"
              @click="isDark = !isDark"
            />
          </ClientOnly>
          <!-- 手機版漢堡選單按鈕 - 顯示在 md 以下 -->
          <UButton
            color="neutral"
            variant="outline"
            @click="toggleMenu"
            :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            size="xl"
            class="md:hidden"
          />
        </div>
      </div>

      <!-- 手機版下拉選單 -->
      <div v-show="isMenuOpen" class="md:hidden">
        <div
          class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700"
        >
          <!-- 手機版左側選單 -->
          <UNavigationMenu
            color="neutral"
            orientation="vertical"
            variant="link"
            :items="itemsLeft"
            class="text-3xl"
          />
        </div>
      </div>
    </div>
  </header>
</template>
