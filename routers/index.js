const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser= require('body-parser')

const router = express.Router()

router.get('/',(req,res)=>{
    res.render('home')
})

router.post('/check',async(req,res)=>{
    const data= req.body
    
    const pt=data.value
    const ht= data.hashedt
    const hashc=await bcrypt.compare(pt,ht)

    if(hashc){
        res.json(pt)
    }
    else{
        res.json('not verified')
    }
})

module.exports=router