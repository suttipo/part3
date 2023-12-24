require('dotenv').config()
const express = require('express')
const path = require('path');
//const logger = require('morgan')//assign morgan to logger
const app = express();
const PORT = 3001
//console.log(process.env.MONGO_URI)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));

// logger.token('host', (req, res) => {
//   return req.hostname
//  })
// logger.token('data', (req, res) => JSON.stringify(req.body))

// app.use(logger(':host :url :res[header] :date[web] :data'))

let phoneBook = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/api/persons', (req, res) => {
  //console.log('res',res)
  res.json(phoneBook)

})

app.get('/api/info', (req, res) => {
  const dateReq = new Date()
  const date = dateReq.toDateString()
  const time = dateReq.toTimeString()
  res.send(
    `<h2>PhoneBook has info for ${phoneBook.length} people</h2>
     <h4>${date} ${time}</h4>`
  )
})
app.post('/api/persons', (req, res) => {
  const person = req.body
  console.log('person 3', person)
  //check name and number is exist
  if (person.hasOwnProperty('name') && person.hasOwnProperty('number')) {
    if (phoneBook.find(ele => ele.name == person.name)) {
      res.status(400).end('name must be uniqe')
    } else {
      const id = Math.floor(Math.random() * 1000)
      console.log('id', id)
      person.id = id
      //console.log('person', person)

      phoneBook = [...phoneBook.concat(person)]
      console.log('phoneBook', phoneBook)
      res.json(person)
    }
  } else {
    res.status(400).send({error:"name or number is no exist"})
  }
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log('req.params.id', id)
  const person = phoneBook.find(ele => ele.id === id);
  console.log('person',person)
  if (person) {
    res.json(person);
    
  } else {
    res.status(404)
    res.end();
  }
  
})

app.delete('/api/phoneBook/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log('id', id)
  let len = phoneBook.length
  phoneBook = phoneBook.filter(ele => ele.id !== id);
  if (len !== phoneBook.length) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))




//creat server
//npm init , npm install express, npm install nodemon,
//write in pakage.json at line script 'start': 'node index.js'
//write in pakage.json at line script 'dev': 'nodemon index.js'
//phoneBook backend step4