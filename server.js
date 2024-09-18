var express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const PORT = 5000
const path = require('path')

app.use(bodyParser.urlenclosed({ extended:true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const getEvents = () => {
  const data = fs.readFileSync('./data/events.json', 'utf8')
  return JSON.parse(data)
}

const saveEvents = (events) => {
  fs.writeFileSync('./data/event.json', JSON.stringify(events, null, 2), 'utf8')
}


app.get('/events', (req,res) => {
  const events = getEvents()
  const newEvent = {
    id: events.length+1,
    event:req.body.event,
    dayOne:req.body.dayOne,
    dayTwo:req.body.dayTwo,
    location:req.body.location,
    address:req.body.address
  }
  events.push(newEvent)
  saveEvents(events)
  res.redirect('/')
})

app.get('/events/:id/edit', (req,res) => {
  const events = getEvents()
  const event = events.find(event => event.id == req.params.id)
  res.render('p', { p })
})

app.post('/events/:id', (req,res) => {
  const events = getEvents()
  const eventIndex = events.findIndex(task => task.id == req.params.id)
  events[eventIndex].event = req.body.event
  events[eventIndex].dayOne = req.body.dayOne
  events[eventIndex].dayTwo = req.body.dayTwo
  events[eventIndex].location = req.body.location
  events[eventIndex].address = req.body.address
  saveEvents(events)
  res.redirect('/')
})

app.post('/events/:id/delete', (req,res) => {
  let events = getEvents()
  events = events.filter(task.id != req.params.id)
  saveEvents(events)
  res.redirect('/')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))