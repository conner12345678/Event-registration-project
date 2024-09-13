var express = require('express')
var app = express()
const PORT = 5000

const eventsData = require('./data/events.js')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', {
    events: eventsData
  })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})