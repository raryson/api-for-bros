const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://bros:123456a@ds249942.mlab.com:49942/api-for-bros')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
 
const Customer = new Schema({
  id: ObjectId,
  name: String,
  age: Number,
  email: String,
  password: String
})

const customerModel = mongoose.model('Customer', Customer);

app.get('/', (req, res) => {
    customerModel.find((err, customers) => {
        res.send(customers)
    })
})

app.get('/:customerId', (req, res) => {
    res.send('list a specific customer')
})

app.post('/', (req, res) => {
    const customer = new customerModel({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    })

    customer.save((error) => {
        if(error)
            res.send(error)
        
        res.send(customer)
    })
})

app.put('/', (req, res) => {
    res.send('update a customer')
})

app.delete('/', (req, res) => {
    res.send('delete a customer')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server running at 3000')
})


