<template>
  <div class="container">
    <p>
      <span>{{ dict['name'][getLanguage] }}</span>
      <input type="text" v-model="name_en" />
    </p>
    <p>
      <span>{{ dict['description'][getLanguage] }}</span>
      <input type="text" v-model="description_en" />
    </p>
    <p>
      <span>{{ dict['modelFile'][getLanguage] }}</span>
      <input
        type="file"
        ref="modelFile"
        @change="modelUpload"
      />
    </p>
    <p>
      <span>{{ dict['imageFile'][getLanguage] }}</span>
      <input
        type="file"
        ref="imageFile"
        @change="imageUpload"
      />
    </p>
    <p>
      <span>{{ dict['tags'][getLanguage] }}</span>
      <input
        type="text"
        ref="tags"
        @change="tagsUpdate"
      />
    </p>
    <button
      class="button is-primary"
      @click="add"
    >
      {{ dict['add'][getLanguage] }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dict from '@/intl/Upload'
// import languageList from '@/intl/language'

import firebase from 'firebase/app'
import 'firebase/storage'

import crypto from 'crypto'

export default {
  name: 'Upload',
  data () {
    return {
      dict: dict,
      status: '',
      added: false,
      name_en: '',
      description_en: '',
      model: {
        url: null,
        ref: null,
      },
      image: {
        url: null,
        ref: null,
      },
      tags: [],
      storageRef: null,
    }
  },
  computed: mapGetters(['getLanguage']),
  methods: {
    add () {
      let doc = {
        name: {
          en: this.name_en,
        },
        description: {
          en: this.description_en,
        },
        url: this.model.url,
        image: this.image.url,
        tags: this.tags,
      }
      this.$fetch(
        'add',
        { doc: doc }
      ).then(
        response => response.json()
      ).then(
        response => {
          if (response.status === 'success') {
            this.status = 'success'
            setTimeout(
              () => {
                this.status = ''
              },
              10000
            )
            for (let entry in document.querySelector('input'))
              console.log(entry)
            this.added = true
          }
        }
      )
    },
    modelUpload: async function () {
      if (this.model.ref !== null)
        this.model.ref.delete()
      if (this.$refs.modelFile.files.length > 0) {
        const filename = crypto.createHash('sha256').update(Date()).digest('hex')
        this.model.ref = await this.storageRef.child(filename + '.' + this.$refs.modelFile.files[0].name.split('.').pop())
        await this.model.ref.put(this.$refs.modelFile.files[0])
        this.model.url = await this.model.ref.getDownloadURL()
      }
    },
    imageUpload: async function () {
      if (this.image.ref !== null)
        this.image.ref.delete()
      if (this.$refs.imageFile.files.length > 0) {
        const filename = crypto.createHash('sha256').update(Date()).digest('hex')
        this.image.ref = await this.storageRef.child(
          'image/' + filename + '.' + this.$refs.imageFile.files[0].name.split('.').pop()
        )
        await this.image.ref.put(this.$refs.imageFile.files[0])
        this.image.url = await this.image.ref.getDownloadURL()
      }
    },
    tagsUpdate () {
      try {
        this.tags = this.$refs.tags.value.split(';').map(t => t.trim())
      }
      catch (e) {}
    },
  },
  mounted () {
    this.storageRef = firebase.storage().ref()
  },
  beforeDestroy: async function () {
    if (!this.added) {
      if (this.model.ref !== null)
        await this.model.ref.delete()
      if (this.image.ref !== null)
        await this.image.ref.delete()
    }
  },
}
</script>

<style lang="sass" scoped>
.loader
  margin: auto
  border: 3px solid #f3f3f3
  border-top: 3px solid #3498db
  border-radius: 50%
  width: 64px
  height: 64px
  animation: spin 2s linear infinite

@keyframes spin
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
</style>
