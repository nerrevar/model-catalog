<template>
  <div class="container">
    <div
      v-if="!loaded"
      class="level"
    >
      <div
        class="level-item is-narrow ml-1 mr-1"
        v-for="index of Array(6).keys()"
        :key="'placeholder' + index"
      >
        <CardPlaceholder />
      </div>
    </div>
    <div class="tile is-ancestor is-vertical">
      <div
        class="tile"
        v-for="verticalIndex of Array(Math.ceil(modelList.length / 6)).keys()"
        :key="'tall' + verticalIndex"
      >
        <div
          class="tile is-2 is-parent"
          v-for="(model, index) in modelList.slice(verticalIndex * 6, (verticalIndex + 1) * 6)"
          :key="index"
        >
          <Card
            class="tile is-child "
            :model="model"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardPlaceholder from './cardPlaceholder'
import Card from './card'

export default {
  name: 'Catalog',
  data () {
    return {
      loaded: false,
      modelList: [],
    }
  },
  components: {
    CardPlaceholder,
    Card,
  },
}
</script>

<style lang="sass" scoped>
</style>
