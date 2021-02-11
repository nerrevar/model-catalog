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
            class="navbar-item"
            v-if="getUser === null"
          >
            <button
              class="button is-link"
              @click="auth"
            >
              {{ dict['auth_google'][getLanguage] }}
            </button>
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

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Header',
  data () {
    return {
      dict: dict,
      pageName: pageName,
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
    getLangs () {
      return langs
    },
  },
  methods: {
    ...mapActions(['setLanguage', 'setUserCredential', 'setUser', 'setAuthError']),
    auth () {
      let provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      firebase.auth().signInWithPopup(provider).then(
        result => {
          console.log(result)
          this.setUserCredential(result.credential)
          this.setUser(result.user.providerData.pop())
          this.setAuthError(null)
        }
      ).catch(
        error => this.setAuthError(error)
      )
    },
    logout () {
      firebase.auth().logout()
      this.setUserCredential(null)
      this.setUser(null)
    },
  },
}
</script>
