const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  });
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons =  [
    {
      name: "Arto Hellas",
      number: "0441111111",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const nameTaken = persons.find(person => person.name === body.name)
    
    if(nameTaken) return res.status(400).json({error: 'name is taken'})
    if(!body.number) return res.status(400).json({error: 'add number'})
    if(!body.name) return res.status(400).json({error: 'add name'})

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*1000000)
    }

    persons.concat(person)

    res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const date = new Date()
    const infoCount = persons.length

    res.send(`<p>Phonebook has info for ${infoCount} people</p><p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})