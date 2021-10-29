const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://sudharshan:devi1432@cluster0.lk5pc.mongodb.net/MY-PROJECT?retryWrites=true&w=majority").then(()=>{
    console.log('Database connected')
}).catch(()=>{
    console.log('Not connected to database')
})