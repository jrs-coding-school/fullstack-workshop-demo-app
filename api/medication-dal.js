const fetch = require('isomorphic-fetch')
const DB = process.env.DB
const { merge, head } = require('ramda')
const capitalize = require('capitalize')

module.exports = {
  query: (name = '') => {
    console.log(
      JSON.stringify({
        use_index: '_design/medication_index',
        selector: {
          type: 'medication',
          name: { $regex: `(.*)${capitalize(name)}` }
        },
        fields: [ 'name', 'rxcui' ],
        sort: [ 'type', { name: 'asc' }, 'rxcui' ],
        limit: 10
      })
    )

    return fetch(`${DB}/_find`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        use_index: '_design/medication_index',
        selector: {
          type: 'medication',
          name: { $regex: `(.*)${capitalize(name)}` }
        },
        fields: [ 'name', 'rxcui' ],
        sort: [ 'type', { name: 'asc' }, 'rxcui' ],
        limit: 10
      })
    })
      .then(res => res.json())
      .then(res => res.docs)
  },
  read: rxcui =>
    fetch(`${DB}/_find`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        use_index: '_design/169b14e392c3201ea7e263490947d93c8db3b9bf',
        selector: { type: 'medication', rxcui },
        fields: [ 'name', 'rxcui' ],
        sort: [ { name: 'asc' } ],
        limit: 1
      })
    })
      .then(res => res.json())
      .then(res => head(res.docs))
}
