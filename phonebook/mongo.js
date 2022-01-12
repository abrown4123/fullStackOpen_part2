const mongoose = require('mongoose')
require('dotenv').config()

const name = process.argv[2]
const number = process.argv[3]

const url = process.env.DBURL

mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
})

const Entry = mongoose.model('Entry', entrySchema)


const saveEntry = () => {
  const entry = new Entry({ name, number })
  entry.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook!`)
    mongoose.connection.close()
  })
}

  
const listAll = () => {
  Entry.find({}).then(result => {
    result.forEach(entry => {
      console.log(entry)
    })
    mongoose.connection.close()
  })
}  

if (process.argv.length < 4) {
  listAll()
} else {
  saveEntry()
}