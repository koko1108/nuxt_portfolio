<template>
  <div class="callout bg-emerald-200 border-l-4 border-emerald-600 text-emerald-800 p-6 py-6 my-6 rounded-lg shadow-md">
    <h5 v-if="$slots.title" class="text-xl flex items-center m-0">
      <Icon name="heroicons-outline:information-circle" class="mr-2" />
      <slot name="title" mdc-unwrap="p" />
    </h5>
    <slot mdc-unwrap="p" />
  </div>
</template>