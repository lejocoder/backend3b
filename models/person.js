const mongoose = require('mongoose')

//mongoose.set('useFindAndModify', false)
// dont use this because if we do findIDandMOdify
// it goes to thtis default which we want to avoid
var uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true})
.then(result => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})


const phonebookSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true, minlength: 3},
    number: {type: String, required: true, minlength: 8}
  })

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
phonebookSchema.plugin(uniqueValidator)
//change
// transform overwrites default objects toJSON(), for 
// determining how Mongoose documents get serialized
// by JSON.stringify()
module.exports = mongoose.model('PhoneBook', phonebookSchema)

// BGI NOTE HERE since the database is named phonebooks, mongodb
// goes through the its database to find the collection with that substring
// in the model argument