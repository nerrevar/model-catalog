<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-1by1 has-background-grey-light"></figure>
    </div>
    <div class="card-content pt-1 pb-1">
      <div class="content is-flex is-flex-direction-column">
        <p class="is-flex is-justify-content-space-between m-0">
          <span class="tag is-link is-light title-placeholder"></span>
          <span class="tag is-link is-light rating-placeholder"></span>
        </p>
        <span class="tag is-small is-link is-light m-1 tag-placeholder is-align-self-center"></span>
        <p class="tag is-link is-light description-placeholder"></p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.title-placeholder
  display: block
  width: 5rem

.rating-placeholder
  display: block
  width: 2rem

.tag-placeholder
  display: block
  width: 2rem

.description-placeholder
  display: block
  width: 9rem
</style>
