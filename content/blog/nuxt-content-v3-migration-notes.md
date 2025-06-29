---
title: Nuxt Content v3 遷移學習筆記
description: 從 Nuxt Content v2 遷移到 v3 的完整指南與踩坑筆記
date: 2025-06-28
cover: nasa-Q1p7bh3SHj8-unsplash.jpg
tags:
  - nuxt
  - content
  - migration
  - vue
---

# Nuxt Content v3 遷移學習筆記

本文記錄了從 Nuxt Content v2 遷移到 v3 的完整過程，包含遇到的問題和解決方案。

## 主要變更點

### 1. API 變更

#### 查詢 API
```js
// v2 寫法
const posts = await queryContent('/blog')
  .sort({ date: -1 })
  .limit(3)
  .find()

// v3 寫法
const posts = await queryCollection('blog')
  .order('date', 'DESC')
  .limit(3)
  .all()
```

#### 核心差異
- `queryContent()` → `queryCollection(collectionName)`
- `.sort()` → `.order(field, direction)`
- `.find()` → `.all()`
- `.findOne()` → `.first()`

### 2. Collection 配置

需要在 `content.config.ts` 中明確定義 collections：

```ts
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        date: z.string(),
        title: z.string(),
        description: z.string().optional(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
```

### 3. Frontmatter 結構變更

#### v2 結構（有問題）
```json
{
  "meta": {
    "date": "2023-05-23",
    "cover": "image.jpg"
  }
}
```

#### v3 結構（正確）
```json
{
  "date": "2023-05-23",
  "cover": "image.jpg"
}
```

**重點：frontmatter 欄位必須在頂層，不能巢狀在 `meta` 裡！**

## 踩坑記錄

### 問題 1：Invalid query 錯誤

**錯誤訊息：**
```
Error: Invalid query
```

**原因：** 嘗試使用 `.order('meta.date', 'DESC')` 對巢狀欄位排序

**解決：** Nuxt Content v3 只支援頂層欄位排序，需要調整 frontmatter 結構

### 問題 2：no such column "date" 錯誤

**錯誤訊息：**
```
Error: no such column: "date" - should this be a string literal in single-quotes?
```

**原因：** 
1. frontmatter 中的 `date` 欄位在 `meta` 下，不是頂層
2. 或者沒有在 schema 中定義 `date` 欄位

**解決：**
1. 確保 frontmatter 格式正確：
```md
---
title: 文章標題
date: 2023-05-23
description: 文章描述
---
```

2. 在 schema 中定義欄位：
```ts
schema: z.object({
  date: z.string(),
  // ... 其他欄位
})
```

### 問題 3：查詢不到資料

**原因：** Collection 名稱不匹配或路徑設定錯誤

**解決：**
1. 確認 collection 定義正確
2. 查詢時使用正確的 collection 名稱
3. 重新啟動 Nuxt 專案讓設定生效

## 最佳實踐

### 1. Frontmatter 設計
```md
---
title: 文章標題
date: 2023-05-23
description: 文章描述
cover: image.jpg
tags:
  - tag1
  - tag2
---
```

### 2. Collection 查詢
```js
// 推薦：直接查詢特定 collection
const posts = await queryCollection('blog')
  .order('date', 'DESC')
  .limit(3)
  .all()

// 不推薦：使用 where 過濾路徑
const posts = await queryCollection('content')
  .where('path', 'LIKE', '/blog%')
  .all()
```

### 3. 元件中使用
```vue
<script setup>
const { data: posts } = await useAsyncData('latest-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(3)
    .all()
)
</script>

<template>
  <div v-for="post in posts" :key="post.path">
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    <img v-if="post.cover" :src="`/images/blog/${post.cover}`" />
  </div>
</template>
```

## 遷移檢查清單

- [ ] 安裝 `@nuxt/content` v3
- [ ] 建立 `content.config.ts`
- [ ] 定義 collections 和 schema
- [ ] 更新 frontmatter 結構（移除巢狀 meta）
- [ ] 更新查詢 API (`queryContent` → `queryCollection`)
- [ ] 更新排序語法 (`.sort()` → `.order()`)
- [ ] 更新查詢方法 (`.find()` → `.all()`)
- [ ] 測試查詢和渲染功能
- [ ] 重新啟動專案確認無錯誤

## 參考資源

- [Nuxt Content v3 官方文件](https://content.nuxt.com/)
- [Migration Guide](https://content.nuxt.com/docs/getting-started/migration)
- [QueryCollection API](https://content.nuxt.com/docs/utils/query-collection)

---

透過這次遷移學習到了 Nuxt Content v3 的新架構設計，雖然有一些破壞性變更，但整體上提供了更好的 TypeScript 支援和更清晰的 API 設計。
