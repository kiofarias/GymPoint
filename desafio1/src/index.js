const express = require('express')

const app = express()

app.use(express.json())

let database = []

function checkProjectIdExist(req,res,next){
  const {id} = req.params
  const project =  database.findIndex(p => p.id == id)
  if (project < 0) {
    return res.status(406).send(`Erro: Projeto com Id(${id}) não encontrado`)
  }
  return next()
}

function logRequests(req,res,next){
  console.count('Número de requisições')
  return next()
}

app.use(logRequests)


app.post('/projects', (req, res) => {
  const { id, title } = req.body
  const project = {
    id: id,
    title: title,
    tasks: []
  }
  database.push(project)
  return res.json(database)
})


app.get('/projects', (req, res) => {
  return res.json(database)
})


app.put('/projects/:id', checkProjectIdExist,(req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = database.find(p => p.id == id)
  project.title = title
  return res.json(project)
})

app.delete('/projects/:id',checkProjectIdExist, (req, res) => {
  const { id } = req.params
  const project = database.findIndex(p => p.id == id)
  database.splice(project, 1)
  return res.status(204).send()
})

app.post('/projects/:id/tasks',checkProjectIdExist, (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const project = database.find(p => p.id == id)
  project.tasks.push(title)
  return res.status(204).send()
})

app.listen(2000)