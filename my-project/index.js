const express = require("express")
const jwt = require('jsonwebtoken')
require('./mongoose')
const userRouter = require('./routers/user')
const twilio = require("twilio")
const client = require("twilio")(twilio.accountSID, twilio.authToken)

const multer = require('multer')
const app = express()
app.use(express.json())
app.use(userRouter)
const port = process.env.PORT || 3000


// const multer = require('multer')
// const upload = multer({
//      dest: 'images'

// })

const upload = multer({
     dest: 'images',
     limits:{
          fileSize:1000000
     },
     fileFilter(req, file, cb) {
        if(!file.originalname.endsWith('.pdf')){
             return cb(new Error('please upload a PDF'))
        }
        cb(undefined,true)
       
     }
 });

app.post('/upload',upload.single('upload'),(req,res) =>{
     res.send()
})

router.patch('/forgotpassword',async(req,res)=>{
     const email = req.body.email
     const user = await User.findOne({email})
     const updatedUser = await User.findOneAndUpdate(req.body.password,req.body,{new:true})
     client
     .verify
     .services(twilio.serviceSID)
     .verifications
     .create({
          to:req.body.phonenumber,
          email:req.body.email
     }).then((data)=>{
          res.send(data)
     })
             
})
app.listen(port,() => {
     console.log('server is up on port')
})
