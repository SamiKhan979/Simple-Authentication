const express = require('express')
const app = express()
const people = require('./data')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/login',(req,res)=>{
    res.status(200).json({success: true , data:people})
})
app.post('/login',(req,res)=>{
    const name = req.body
    if(!name){
        return res.status(404).json({success:false, msg:"Please enter the name"})
    }
    res.status(201).send({success:true,person:name})
})
app.put('/login/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    const person = people.find((person)=> person.id == Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `No person with id ${id}` })
    }
    const newPerson = people.map((person)=>{
        if(person.id == Number(id)){
            person.name = name
        }
        return person
    })
    res.status(200).json({success:true,data:newPerson})
})
app.listen(3000,()=>{
    console.log('Server is Listening On Port 3000..')
})