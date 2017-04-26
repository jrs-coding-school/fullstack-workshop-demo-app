require('dotenv').config({ path: '../.env' })
const DB = process.env.DB
const fetch = require('isomorphic-fetch')

fetch(`${DB}/_index`, {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({
    name: 'doctype_index',
    ddoc: 'doctype_index',
    index: { fields: [ 'type' ] },
    type: 'json'
  })
})
  .then(res => res.json())
  .then(res => console.log(res))

fetch(`${DB}/_index`, {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({
    name: 'medication_index',
    ddoc: 'medication_index',
    index: { fields: [ 'type', 'name', 'rxcui' ] },
    type: 'json'
  })
})
  .then(res => res.json())
  .then(res => console.log(res))
