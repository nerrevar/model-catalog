<template>
  <nav class="tabs is-boxed is-fillwidth">
    <div class="container">
      <ul
        class="is-justify-content-space-around"
      >
        <li
          v-for="(route, index) in getRouteList"
          :key="index"
          :class="{ 'is-active': $router.currentRoute.path === route.path }"
        >
          <router-link :to="route">
            {{ pageName[route.name][getLanguage] }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

import pageName from '@/intl/pageName'

export default {
  name: 'Footer',
  data () {
    return {
      pageName: pageName,
    }
  },
  computed: {
    ...mapGetters(['getLanguage']),
    getRouteList () {
      return this.$router.options.routes.filter(r => r.path !== '*')
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
