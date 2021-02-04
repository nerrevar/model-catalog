<template>
  <div class="card">
    <div class="title is-4 mb-0">{{ dict['header'][getLanguage] }}</div>
    <div class="card-content pb-0">
      <div
        class="level is-clipped"
        ref="carusel"
      >
        <!-- Temporary placeholder for load time -->
        <div
          class="level-item is-narrow ml-1 mr-1"
          v-for="index of Array(6).keys()"
          :key="'placeholder' + index"
          v-show="!loaded"
        >
          <CardPlaceholder />
        </div>
        <div
          class="level-item ml-1 mr-1 is-2"
          v-for="(model, index) in popularList"
          :key="index"
          v-show="loaded"
        >
          <span v-if="popularList.length === 0">{{ dict['noItem'][getLanguage] }}</span>
          <Card :model="model" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CardPlaceholder from './cardPlaceholder'
import Card from './card'

export default {
  name: 'PopularList',
  props: ['dict'],
  data () {
    return {
      interval: 0,
      loaded: false,
      popularList: [],
    }
  },
  components: {
    CardPlaceholder,
    Card,
  },
  computed: mapGetters(['getLanguage']),
  created () {
    // fetch content
    // this.$fetch()
  },
  mounted () {
    this.interval = setInterval(
      () => {
        this.$refs.carusel.scrollBy(1, 0)
        if (this.$refs.carusel.scrollLeft >= this.$refs.carusel.scrollLeftMax)
          this.$refs.carusel.scrollLeft = 0
      },
      150
    )
    this.$refs.carusel.addEventListener('mouseleave', () => {
      if (this.interval === null)
        this.interval = setInterval(
          () => {
            this.$refs.carusel.scrollBy(1, 0)
            if (this.$refs.carusel.scrollLeft >= this.$refs.carusel.scrollLeftMax)
              this.$refs.carusel.scrollLeft = 0
          },
          150
        )
    })
    this.$refs.carusel.addEventListener('mouseenter', () => {
      clearInterval(this.interval)
      this.interval = null
    })
  },
}
</script>
