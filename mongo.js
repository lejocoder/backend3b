const mongoose = require('mongoose')

if ( process.argv.length> 5 ) {
  console.log('too many arguments')
  process.exit(1)
}

const password = process.argv[2]
const argName = process.argv[3]
//const phone = process.argv[4]
const url =
  `mongodb+srv://phonebookfullstack:${password}@cluster0-owprb.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneBook = mongoose.model('PhoneBook', phonebookSchema)
if (process.argv.length == 5) {
    const entry = new PhoneBook({
        name: argName,
        number: phone
      })
      
      entry.save().then(response => {
        console.log(`added ${argName} ${phone} to phonebook`)
        mongoose.connection.close()
      })
}
else if (process.argv.length == 3) {
    PhoneBook.find({}).then(result => {
        result.forEach(entry => {
            console.log(entry)
        })
        mongoose.connection.close()
    })
    
}
else {
    console.log('something went wrong')
}

