const express = require('express')
const bodyParser= require('body-parser')
const path=require('path')
const router= require('./routers/index')
const PORT=8001
const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(express.static(path.join(__dirname, './public')))

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})