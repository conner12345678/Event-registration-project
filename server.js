var express = require('express')
var app = express()
const PORT = 5000

const eventsData = require('./data/events.js')
const peopleData = require('./data/people.js')


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', {
    events: eventsData,
    people: peopleData
  })
})
app.get('/form', (req,res)=>{
  res.render('pages/form', {
    events: eventsData,
    people: peopleData
  })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})