<script setup>
const links = [
  { name: 'GitHub', href: 'https://github.com/koko1108', icon: 'entypo-social:github-with-circle' },
 { name: 'Facebook', href: 'https://facebook.com/koko1108', icon: 'entypo-social:facebook' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/koko1108', icon: 'entypo-social:linkedin-with-circle' },
  { name: 'Instagram', href: 'https://instagram.com/koko1108', icon: 'entypo-social:instagram' }
]
</script>

<template>
  <footer class="bg-gray-800 text-gray-300">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between md:justify-between py-6 gap-4">
        <!-- 版權資訊 -->
        <p class="text-sm order-2 md:order-1 w-full md:w-auto text-center md:text-left">
          &copy; Koko 2025. All Rights Reserved
        </p>
        
        <!-- 社群媒體連結 -->
        <div class="flex space-x-4 order-1 md:order-2 w-full md:w-auto justify-center md:justify-end">
          <a 
            v-for="link in links" 
            :key="link.name" 
            :href="link.href"
            :title="link.name"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <Icon :name="link.icon" class="w-9 h-9 md:w-8 md:h-8" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>