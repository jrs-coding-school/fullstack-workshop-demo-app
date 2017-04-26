const request = require('request')
const url = 'http://127.0.0.1:5984/simrx'
const { merge, set, lensProp, append } = require('ramda')

module.exports = {
  list: cb => {
    const options = {
      json: {
        selector: { type: 'patient' },
        use_index: '_design/doctype_index'
      }
    }
    request.post(url + '/_find', options, (e, r, b) => {
      if (e) {
        return cb(e)
      }
      cb(null, b.docs)
    })
  },
  create: (doc, cb) => {
    // TODO: Validation
    doc.type = 'patient'
    doc.createdAt = new Date().toISOString()
    request.post(url, { json: doc }, (e, r, b) => {
      if (e) return cb(e)
      if (!b.ok) return cb(new Error('could not create document'))
      cb(null, merge(doc, { _id: b.id, _rev: b.rev }))
    })
  },
  update: (id, doc, cb) => {
    doc.updatedAt = new Date().toISOString()
    request.put(url + '/' + id, { json: doc }, (e, r, b) => {
      if (e) return cb(e)
      if (!b.ok) return cb(new Error('could not update document'))
      cb(null, merge(doc, { _id: b.id, _rev: b.rev }))
    })
  },
  read: (id, cb) => {
    request.get(url + '/' + id, { json: true }, (e, r, b) => {
      if (e) return cb(e)
      cb(null, b)
    })
  },
  delete: (id, rev, cb) => {
    // request.delete(url + '/' + id + '?rev=' + rev)
    request.delete(`${url}/${id}?rev=${rev}`, { json: true }, (e, r, b) => {
      if (e) return cb(e)
      cb(null, b)
    })
  },
  addMedication: (medication, patientId, cb) => {
    request(`${url}/${patientId}`, { json: true }, (e, r, b) => {
      if (e) return cb(e)
      const patient = set(
        lensProp('medications'),
        append(medication, b.medications),
        b
      )
      request.put(`${url}/${patientId}`, { json: patient }, (e, r, res) => {
        cb(null, merge(patient, { _id: res.id, _rev: res.rev }))
      })
    })
  }
}
