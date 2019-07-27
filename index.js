const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
var morgan = require('morgan')
const cors = require('cors')
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
/* this was a text but it works
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  */
app.get('/api/persons', (request, response) => {
    response.json(persons)
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

app.post('/api/persons', (request, response) => {
    const body = request.body 
    const personName = body.name
    const inPhoneBook = persons.find(person => person.name == personName)
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
    else if (inPhoneBook) {
        return response.status(400).json({
            error: 'name is already in phonebook'
        }) // tested once, works!
    }
    const person = {
        name: body.name,
        number: body.number,
        id: idGenerator(),
    }

    persons = persons.concat(person)
    console.log(morgan())


    response.json(person) // dont forget to use common sense
    // response is to return , request is to retrieve
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
// 204 code means that the request has suceeded but the client
// doesnt need to go away from its current page
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// having porblems figuring out how to retrieve the content of
// the request