const fetch = require('isomorphic-fetch')
const DB = process.env.DB
const { merge } = require('ramda')

module.exports = {
  query: (query = {}) =>
    fetch(`${DB}/_find`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        selector: merge(query, { type: 'doctor' }),
        use_index: '_design/doctype_index'
      })
    })
      .then(res => res.json())
      .then(res => res.docs),
  create: doc =>
    fetch(`${DB}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(doc)
    })
      .then(res => res.json())
      .then(res => merge(doc, { _id: res.id, _rev: res.rev })),
  read: id => fetch(`${DB}/${id}`).then(res => res.json()),
  update: (id, doc) =>
    fetch(`${DB}/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(doc)
    })
      .then(res => res.json())
      .then(res => merge(doc, { _id: res.id, _rev: res.rev })),
  delete: (id, rev) =>
    fetch(`${DB}/${id}?rev=${rev}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE'
    }).then(res => res.json())
}
