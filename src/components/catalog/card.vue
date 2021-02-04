<template>
  <div
    class="card hoverable"
  >
    <div class="card-image">
      <figure class="image is-1by1">
        <img class="vertical" :src="model.image" :alt="'\u{1F383}'" />
      </figure>
    </div>
    <div class="card-content pt-1 pb-1">
      <div class="content">
        <p>
          <strong>{{ model.name[getLanguage] }}</strong>
          &nbsp;&nbsp;
          <b>{{ model.rating || 0 }}</b>
        </p>
        <p>
          <span
            v-for="(tag, tagIndex) in model.tags"
            :key="tagIndex"
            class="tag is-small is-link is-light m-1"
          >
            {{ tag }}
          </span>
        </p>
        <p>{{ model.description[getLanguage] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Card',
  props: ['model'],
  computed: mapGetters(['getLanguage']),
}
</script>

<style lang="sass" scoped>
.vertical:before
  position: absolute
  top: calc((100% - 1em) / 2)

.hoverable:hover
  cursor: pointer
  box-shadow: 0 0 1em 0.3em pink
</style>
