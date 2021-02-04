import express from 'express'
import history from 'connect-history-api-fallback'
import morgan from 'morgan'

let app = express()

app.use(morgan('dev'))
app.use(history())
app.use(express.static('dist'))
app.use(express.static('public'))

app.use((req, res) => {
  res.status(200).send('test')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
