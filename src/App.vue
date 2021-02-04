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

export default {
  name: 'App',
  components: {
    Header,
    Footer,
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
