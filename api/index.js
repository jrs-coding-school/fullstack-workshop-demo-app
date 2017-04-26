if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const request = require('request')

const app = express()

const patientDal = require('./patient-dal')
const doctorDal = require('./doctor-dal')
const medicationDal = require('./medication-dal')

app.use(cors({ credentials: true, origin: 'https://couchdb-query.now.sh' }))

app.post('/patients/:patientId/medications', bodyParser.json(), (req, res) => {
  patientDal.addMedication(req.body, req.params.patientId, (err, patient) => {
    if (err) {
      console.log(err.message)
      return res
        .status(500)
        .send({ message: 'cant add medication to patient' })
    }
    res.send(patient)
  })
})

app.get('/medications/search/:name', (req, res) => {
  medicationDal
    .query(req.params.name)
    .then(docs => res.send(docs))
    .catch(({ message }) => res.status(500).send({ message }))
})

app.get('/medications/:rxcui', (req, res) => {
  medicationDal
    .read(req.params.rxcui)
    .then(medication => res.send(medication))
    .catch(({ message }) => res.status(500).send({ message }))
})

app.get('/doctors', (req, res) => {
  doctorDal
    .query()
    .then(docs => res.send(docs))
    .catch(err => res.status(500).send({ mesage: err.message }))
})

app.post('/doctors', bodyParser.json(), (req, res) => {
  doctorDal
    .create(req.body)
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send({ mesage: err.message }))
})

app.get('/doctors/:id', (req, res) => {
  doctorDal
    .read(req.params.id)
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send({ mesage: err.message }))
})

app.put('/doctors/:id', bodyParser.json(), (req, res) => {
  doctorDal
    .update(req.params.id, req.body)
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send({ mesage: err.message }))
})

app.delete('/doctors/:id', (req, res) => {
  // TODO: Validation check if no query.rev
  if (!req.query.rev) {
    return res
      .status(500)
      .send({ message: 'rev qu\xABery param is required!' })
  }
  doctorDal
    .delete(req.params.id, req.query.rev)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ mesage: err.message }))
})

app.get('/patients', (req, res) => {
  patientDal.list((err, body) => {
    if (err) {
      console.log(err.message)
      return res.status(500).send({ message: 'cant list patients' })
    }
    res.send(body)
  })
})

app.post('/patients', bodyParser.json(), (req, res) => {
  patientDal.create(req.body, (err, result) => {
    if (err) {
      console.log(err.message)
      return res.status(500).send({ message: 'cant create patient' })
    }
    res.send(result)
  })
})

app.get('/patients/:id', (req, res) => {
  patientDal.read(req.params.id, (err, patient) => {
    if (err) {
      console.log(err.message)
      return res.status(500).send({ message: 'cant find patient by id' })
    }
    res.send(patient)
  })
})

app.put('/patients/:id', bodyParser.json(), (req, res) => {
  patientDal.update(req.params.id, req.body, (err, patient) => {
    if (err) {
      console.log(err.message)
      return res.status(500).send({ message: 'cant update patient' })
    }
    res.send(patient)
  })
})

app.delete('/patients/:id', (req, res) => {
  // TODO: Validation check if no query.rev
  if (!req.query.rev) {
    return res
      .status(500)
      .send({ message: 'rev qu\xABery param is required!' })
  }
  patientDal.delete(req.params.id, req.query.rev, (err, result) => {
    if (err) {
      console.log(err.message)
      return res.status(500).send({ message: 'cant remove patient' })
    }
    res.send(result)
  })
})

app.get('/', (req, res) => {
  res.send({ app: 'Patient Chart API version 1.0' })
})

app.listen(3000)
console.log('API Server is listening or port 3000')
