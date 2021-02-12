import express from 'express'
import history from 'connect-history-api-fallback'
import morgan from 'morgan'

import firebase from 'firebase-admin'

import dotenv from 'dotenv'
dotenv.config()

firebase.initializeApp()

const db = firebase.firestore()

let app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(history())
app.use(express.static('dist'))
app.use(express.static('public'))

app.post('/popular', async (req, res) => {
  let popularList = []
  const snapshot = await db.collection('model').orderBy('rating', 'desc').limit(15).get()
  if (snapshot.empty)
    res.send({
      status: 'empty',
    })
  snapshot.forEach(doc => popularList.push(doc.data()))
  res.send({
    status: 'success',
    popularList: popularList,
  })
})

app.post('/catalog', async (req, res) => {
  let modelList = []
  let snapshot
  if (req.body.offset)
    snapshot = await db.collection('model').orderBy('rating', 'desc').limit(30).offset(req.body.offset).get()
  else
    snapshot = await db.collection('model').orderBy('rating', 'desc').limit(30).get()
  if (snapshot.empty)
    res.send({
      status: 'empty',
    })
  snapshot.forEach(doc => modelList.push(doc.data()))
  res.send({
    status: 'success',
    modelList: modelList,
  })
})

app.post('/add', async (req, res) => {
  const doc = req.body.doc
  let model = {
    name: {
      en: doc.name.en,
      ru: doc.name.ru ? doc.name.ru : doc.name.en,
    },
    description: {
      en: doc.description.en,
      ru: doc.description.ru ? doc.description.ru : doc.description.en,
    },
    url: doc.url,
    image: doc.image,
    rating: 0,
    tags: doc.tags,
  }
  const result = await db.collection('model').add(model)
  res.send({
    status: result.id ? 'success' : 'error',
  })
})

app.use((req, res) => {
  res.status(200).end()
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})

module.exports = app
