<template>
  <header class="container">
    <div class="navbar">
      <div class="navbar-brand">
        <router-link :to="{path: '/'}" class="navbar-item">
          <img src="@/assets/logo.png" alt="Logo">
        </router-link>
        <span class="navbar-burger" data-target="navbarMenuHeroC">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>

      <div id="navbarMenuHeroC" class="navbar-menu">
        <div class="navbar-end">
          <router-link
            v-for="(route, index) in getRouteList"
            :key="index"
            :to="route"
            :class="[ 'navbar-item', { 'is-active': $router.currentRoute.path === route.path }]"
          >
            {{ getPageName(route.name) }}
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              <img src="@/assets/lang.svg" alt="&#127760;" />
            </div>
            <div class="navbar-dropdown">
              <div
                v-for="(lang, index) in getLangs.list"
                :key="index"
                :class="[ 'navbar-item', 'is-hoverable', { 'is-active': getLanguage === lang }]"
                @click="setLanguage(lang)"
                @touchend="setLanguage(lang)"
              >
                <img :src="getLangs.icons[lang]" alt="" />&nbsp;&nbsp;{{ lang }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 class="title is-1"> {{ dict['greeting'][getLanguage] }}</h1>
    <PopularList :dict="dict['popularList']"/>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import pageName from '@/intl/pageName'
import langs from '@/intl/language'
import dict from '@/intl/Header'

import PopularList from './catalog/popularList'

export default {
  name: 'Header',
  data () {
    return {
      dict: dict,
    }
  },
  components: {
    PopularList,
  },
  computed: {
    ...mapGetters(['getLanguage']),
    getRouteList () {
      return this.$router.options.routes.filter(r => r.path !== '*')
    },
    getLangs () {
      return langs
    },
  },
  methods: {
    ...mapActions(['setLanguage']),
    getPageName (target) {
      return pageName[target][this.getLanguage]
    },
  },
}
</script>
