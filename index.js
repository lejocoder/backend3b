const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
var morgan = require('morgan')
const cors = require('cors')
const People = require('./models/person')
require('dotenv').config()
app.use(express.static('build')) // remember this in order to render the build
// for the main page
app.use(cors())
morgan.token('type', function(req,res) {return JSON.stringify(req.body)})
app.use(morgan(function (tokens, req, res) {
    return `Server running on port ${PORT} \n` + [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.type(req,res)
    ].join(' ')
  }))
// goal try to set up so you get rid of persons,
// replace it with our database
// then fetch everything from our database
/*
let persons = [  
    {    
        name: "Arto Hellas",
        number: "040-123456",
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
        number: "39-2306423122",
        id: 4
    }
]
*/
/* this was a text but it works
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  */
app.get('/api/persons', (request, response) => {
    People.find({}).then(persons => {
        response.json(persons)
    })
  })
// info just gives infromation about the current length of the array 
// we do a line break then  we provide  a new date object to give current time
// the request was granted
app.get('/info', (request,response) => {
    
    response.send(`<div>
    PhoneBook has info for ${persons.length} people. <br></br> ${new Date()}
</div>`)
})

// first we retrieve the id, then we find the person, then
// we find him/her than return our response in JSON form
app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id == id)
    console.log(morgan())
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
    
})

const idGenerator = () => {
    const id = Math.floor(Math.random() * 1000000)
    return id
    console.log(morgan('tiny'))
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body 
    const personName = body.name
    const inPhoneBook = People.find({name: personName})
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    // dont make a new one or it will make a new person and add to it
    //console.log(inPhoneBook)
    if (inPhoneBook !== [])
    {
        console.log('thsi went through here')
        const person = {
            name: body.name,
            number: body.number
        }
        People.find({name: personName}, {id: 1}).then(id => {
            People.findByIdAndUpdate(id, person, {new: true})
            .then(result => {
                response.json(result.toJSON())
            })
        })
    }
    else 
    {
        const person = new People({
            name: body.name,
            number: body.number
        })
        person.save().then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
    }
    
        //persons = persons.concat(person)
     
    //console.log(morgan())
    //response.json(person) // dont forget to use common sense
    // response is to return , request is to retrieve
    
})

app.delete('/api/persons/:id', (request, response, next) => {
    People.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})
app.put('/api/persons', (request,response,next) => {
    const body = request.body
    const personName = body.name
    const person = {
        name: personName,
        number: body.number
    }
    People.find({name: personName}, {id: 1}).then(id => {
        People.findByIdAndUpdate(id, person, {new: true})
        .then(result => {
            response.json(result.toJSON())
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    // if it is this type of error do this 
    // if not just do next
    next(error)
  }
  
  app.use(errorHandler)
// found success in removing id!
// 204 code means that the request has suceeded but the client
// doesnt need to go away from its current page
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// having porblems figuring out how to retrieve the content of
// the request