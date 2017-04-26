# Patient Chart App

A sample app to practice full stack applications

## Requirements

* docker version 17+
* node version 7.8+

## Setup

If you do not have your couchdb2 database setup, you can set it up following these
instructions.

First start your db server by running

``` sh
mkdir data
npm install
npm run db
```

Open http://localhost:5984/_utils/#setup and select configure single db

In another terminal go to your project folder and run the following commands:

``` sh
git clone https://github.com/twilson63/simulate-rx-db.git
cd simulate-rx-db
npm install
npm run createdb http://localhost:5984/simrx
cd ..
```
