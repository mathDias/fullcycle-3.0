const express = require('express')
const faker = require('faker')

const app = express()
const port =  3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)
app.get('/', (req,res) => {
  const name = faker.name.findName()
  connection.query(`INSERT INTO people (nome) VALUES ('${name}')`)
  connection.query(`SELECT nome FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks</h1>
      <ul>
        ${!!results.length ? results.map(el => `<li>${el.nome}</li>`).join('') : ''}
      </ul>
    `)
  })
})

app.listen(port,() => {
    console.log('Rodando na porta '+port)
})