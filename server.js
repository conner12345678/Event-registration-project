var express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const PORT = 5000
const path = require('path')

app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const getEvents = () => {
  const data = fs.readFileSync('./data/events.json', 'utf8')
  return JSON.parse(data)
}

const saveEvents = (events) => {
  fs.writeFileSync('./data/events.json', JSON.stringify(events, null, 2), 'utf8')
}

app.get('/', (req,res) => {
  const events = getEvents()
  res.render('index', { events })
})


app.get('/events', (req,res) => {
  const events = getEvents()
  res.redirect('/')
})

app.get('/events/editor', (req,res) => {
  res.render('add')
})

app.post('/events',(req,res) => {
  const events = getEvents()
  const newEvent = {
    id: events.length + 1,
    event: req.body.event,
    dayOne: req.body.dayOne,
    dayTwo: req.body.dayTwo,
    location: req.body.location,
    address: req.body.address,
    names: req.body.names
  }
  events.push(newEvent)
  saveEvents(events)
  res.redirect('/')
})

app.get('/events/:id/deletor', (req,res) => {
  const events = getEvents()
  const event = events.find(event => event.id == req.params.id)
  res.render('delete', { event })
})

app.post('/events/:id/delete', (req,res) => {
  const events = getEvents()
  const eventIndex = events.findIndex(event => event.id == req.params.id)
  events.splice(eventIndex, 1)
  saveEvents(events)
  res.redirect('/')
})

app.get('/events/:id/edit', (req,res) => {
  const events = getEvents()
  const event = events.find(event => event.id == req.params.id)
  res.render('form', { event })
})

app.post('/events/:id', (req,res) => {
  const events = getEvents()
  const eventIndex = events.findIndex(event => event.id == req.params.id)
  events[eventIndex].event = req.body.event
  events[eventIndex].dayOne = req.body.dayOne
  events[eventIndex].location = req.body.location
  events[eventIndex].address = req.body.address
  events[eventIndex].names += req.body.names+", "
  saveEvents(events)
  res.redirect('/')
})

app.post('/events/:id/delete', (req,res) => {
  let events = getEvents()
  events = events.filter(event => event.id != req.params.id)
  saveEvents(events)
  res.redirect('/')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))