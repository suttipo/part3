const mongoose = require ('mongoose');

//encode password from process.argv[2]
const password = process.argv[2]
//encodeURIComponent(process.argv[2]);
console.log('password',password);
//assign name , number from process.argv
const name = process.argv[3];
const number = process.argv[4];
//console.log('name, number', name, number);
//define url for connect mongodb
const url = `mongodb+srv://suttiponglaisiri:${password}@cluster0.ljjfkzi.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false);
//connect mongodb server
mongoose.connect(url)
.then(() => console.log('connect to mongodb yet'))
.catch(err => console.log(err));

//define personSchema 
const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
//define model with Persons collection and use personSchema
const Persons = mongoose.model('Persons', personSchema);
if(process.argv.length < 3){
    console.log('give password as argument.')
    process.exit(1)
}else if(process.argv.length === 3){
    Persons.find({})
    .then(result => {
        console.log('PhoneBook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        .then(() => console.log('disconnect to mongodb yet'))
        .catch(err => console.log(err));
        
    })
}else if(process.argv.length > 3){

//assing name and number to person
const person = new Persons({
    name: process.argv[3],
    number: process.argv[4]
})
console.log('person', person);

person.save().then(result => {
    console.log(`Added ${result.name} ${result.number} to phonebook`);
    mongoose.connection.close()
}).catch(err => console.log(err));
}