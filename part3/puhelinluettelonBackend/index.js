const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

const errorHandler = (error, req, res, next) => {
	console.error(`------------ error handler viesti: ${error.message}`)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}
	next(error)
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}


app.get('/', (req, res) => {
	console.log('gethello')
	res.send('<h1>Hello World!</h1>')
})



app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body
	console.log(body)
	if(body.number === undefined) return res.status(400).json({ error: 'add number' })
	if(body.name === undefined) return res.status(400).json({ error: 'add name' })

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
		.then(savedPerson => {
			res.json(savedPerson)
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person){
				res.json(person)
			} else {
				res.status(400).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	console.log(req.params)
	Person.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
})
app.put('/api/persons/:id', (req, res, next) => {
	const { name, number } = req.body

	Person.findByIdAndUpdate(req.params.id, { name, number },
		{ new: true, runValidators: true, context: 'query' })
		.then(updatedPerson => {
			res.json(updatedPerson)
		})
		.catch(error => next(error))
})


app.get('/info', (req, res, next) => {
	Person.find({})
		.then(persons => {
			const infoCount = persons.length
			const date = new Date()

			res.send(`<p>Phonebook has info for ${infoCount} people</p><p>${date}</p>`)
		})
		.catch(error => next(error)
		)
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})