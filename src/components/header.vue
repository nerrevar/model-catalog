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
            {{ pageName[route.name][getLanguage] }}
          </router-link>
          <div
            class="navbar-item has-dropdown is-hoverable has-background-link"
            v-if="getUser === null"
          >
            <div class="navbar-link">
              <span>
                {{ dict['auth_google'][getLanguage] }}
              </span>
            </div>
            <div class="navbar-dropdown">
              <div
                class="button is-info m-1"
                @click="auth('google')"
              >
                <img class="ml-4 mr-2" src="https://google.com/favicon.ico" alt="" />
                <span class="mr-4">Google</span>
              </div>
              <div
                class="button is-info m-1"
                @click="auth('github')"
              >
                <img class="ml-4 mr-2" src="https://github.com/favicon.ico" alt="" />
                <span class="mr-4">GitHub</span>
              </div>
            </div>
          </div>
          <div
            class="navbar-item has-dropdown is-hoverable"
            v-if="getUser !== null"
          >
            <div class="navbar-link">
              <figure class="image is-32x32">
                <img class="is-rounded" :src="getUser.photoURL" :alt="'\u{1F464}'" />
              </figure>
              <span>{{ getUser.displayName }}</span>
            </div>
            <div class="navbar-dropdown">
              <button
                class="button is-danger"
                @click="logout"
              >
                {{ dict['logout'][getLanguage] }}
              </button>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              <img src="@/assets/lang.svg" alt="&#127760;" />
            </div>
            <div class="navbar-dropdown">
              <div
                v-for="(lang, index) in langs.list"
                :key="index"
                :class="[ 'navbar-item', 'is-hoverable', { 'is-active': getLanguage === lang }]"
                @click="setLanguage(lang)"
                @touchend="setLanguage(lang)"
              >
                <img :src="langs.icons[lang]" alt="" />&nbsp;&nbsp;{{ lang }}
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

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Header',
  data () {
    return {
      dict: dict,
      pageName: pageName,
      langs: langs,
    }
  },
  components: {
    PopularList,
  },
  computed: {
    ...mapGetters(['getLanguage', 'getUser']),
    getRouteList () {
      return this.$router.options.routes.filter(r => r.path !== '*')
    },
  },
  methods: {
    ...mapActions(['setLanguage', 'setUserCredential', 'setUser', 'setAuthError']),
    auth (providerName) {
      firebase.auth().languageCode = this.getLanguage

      let provider = null
      switch (providerName) {
        case 'google': {
          provider = new firebase.auth.GoogleAuthProvider()
          provider.addScope('profile')
          provider.addScope('email')
          break
        }
        case 'github': {
          provider = new firebase.auth.GithubAuthProvider()
          provider.addScope('read:user')
          provider.addScope('user:email')
          break
        }
      }

      firebase.auth().signInWithPopup(provider).catch(
        error => this.setAuthError(error)
      )
    },
    logout () {
      firebase.auth().signOut()
      this.setUserCredential(null)
      this.setUser(null)
    },
  },
}
</script>

<style lang="sass" scoped>
.navbar-link
  color: hsl(219, 70%, 96%)
  &:after
    border-color: hsl(219, 70%, 96%)!important
  &:hover
    color: hsl(217, 71%, 53%)
    &:after
      border-color: hsl(217, 71%, 53%)!important
</style>
