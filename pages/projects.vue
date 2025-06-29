<script setup>
const query = gql`
  query getProjects($limit: Int!) {
    viewer {
      repositories(first: $limit, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          id
          name
          createdAt
          description
          url
          forks {
            totalCount
          }
          watchers {
            totalCount
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;
const variables = { limit: 5 }
const { data } = await useAsyncQuery(query, variables)
</script>
<template>
  <h1 class="text-4xl font-bold mb-8">Projects</h1>
  <p class="text-lg mb-8">Here are some of my projects on GitHub.</p>
  <section class="grid grid-cols-2 gap-10 mb-10">
    <div
      v-for="project in data?.viewer.repositories.nodes"
      :key="project.id"
      class="p-8 border-3 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <a :href="project.url" target="_blank">
        <h2 class="text-2xl text-indigo-800 font-semibold mb-2 hover:underline">
          {{ project.name }}
        </h2>
      </a>
      <p>{{ project.description }}</p>
      <div class="mt-4">
        <Icon name="fontisto:star" size="1.1rem" class="text-indigo-700" />
        Stars: {{ project.stargazers.totalCount }}
        <Icon
          name="system-uicons:branch"
          size="1.1rem"
          class="text-indigo-800"
        />
        Forks: {{ project.forks.totalCount }}
        <Icon name="system-uicons:eye" size="1.1rem" class="text-indigo-700" />
        Watchers: {{ project.watchers.totalCount }}
      </div>
    </div>
  </section>
</template>

<style scoped></style>
