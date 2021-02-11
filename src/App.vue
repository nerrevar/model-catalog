<template>
  <div id="app" class="container">
    <div class="hero is-fullheight">
      <div class="hero-head">
        <Header />
      </div>

      <div class="hero-body">
        <router-view />
      </div>

      <div class="hero-foot">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

import firebase from 'firebase/app'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted () {
    const firebaseConfig = {
      apiKey: 'AIzaSyBoOuFaBPdtbqG_Stx6_Zq5nGDFdfHe75g',
      authDomain: 'model-catalog-303814.firebaseapp.com',
      projectId: 'model-catalog-303814',
      storageBucket: 'model-catalog-303814.appspot.com',
      messagingSenderId: '712573757834',
      appId: '1:712573757834:web:d969e1bce947165c624073',
    }
    firebase.initializeApp(firebaseConfig)
  },
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

.wrapper
  width: 100%
  margin: 0
  display: flex
  flex: 1 0
</style>
