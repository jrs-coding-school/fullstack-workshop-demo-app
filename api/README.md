# Patient Chart API

A RESTFUL interface to our Patient Chart Database.

## Install

```
npm install
```

## Usage

```
npm start
```

or (if development)

```
npm run dev
```

## API

### Patients

- GET /patients

Give all the patients

- POST /patients

Create a new patient

- GET /patients/:id

Get a patient document by patient id

- PUT /patients/:id

Update a patient document by patient id

- DELETE /patients/:id

Remove a patient document by patient id

### Doctors

- GET /doctors

Give all the doctors

- POST /doctors

Create a new patient

- GET /doctors/:id

Get a doctor document by doctor id

- PUT /doctors/:id

Update a doctor document by doctor id

- DELETE /doctors/:id

Remove a doctor document by doctor id

### Medications

- GET /medications/search/:name

Find Medication

- GET /medications/:rxcui

Get a medication document by rxcui
