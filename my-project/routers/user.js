const express = require("express")
const router = new express.Router()
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')



// creating user
router.post('/user', async(req,res) =>{
    const user =new User(req.body)
    try{
        const token= await user.genarateAuthToken()
     await user.save()
     res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})    
// reqesting user
router.get('/user/login',auth,async(req,res) =>{
   const email = req.body.email
   const password = req.body.password
   const user = await User.findOne({email})
try{
    if(!user) {
        return res.status(400).send('user is not there for this email')
    } else if(email === user.email && password === user.password) {
    return res.status(200).send('Login successfully')
    }
    res.send('Incorrect password')
} catch(e) {
    res.status(500).send(e)
}
})
router.post('/logout',auth, async(req,res) => {
    
   const user = req.user
   const token = req.token
   try{
   await User.findOneAndUpdate({id:user._id},{$unset:{token:user.token}})
       res.status(200).send('Logout successfully completed')
   }catch(e){
       res.status(500).send(e)
   }
   })

   const upload = multer({
       dest: 'avatars',
       limits: {
           fileSize: 1000000
       },
       fileFilter(req,file,cb) {
           if(!file.originalname.match( /\.(jpg|jpeg|png)$/)) {
               return cb(new Error('please upload an image'))

           }
           cb(undefined, true)
       }
   })


   router.post('/upload/avatar', upload.single("avatar"),(req, res) => {
     res.send()
   })

// router.patch('/forgotpassword',async(req,res)=>{
//     const email = req.body.email
//     const user = await User.findOne({email})
//     const updatedUser = await User.findOneAndUpdate(req.body.password,req.body,{new:true})
            
//     if(!user){
//         res.sattus(404).send()

// console.log(updatedUser)
// })
 module.exports = router