const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/routes");
const app = express()

app.use(express.json());  


mongoose.connect("mongodb+srv://anurag:jhansi112233@my-cluster.cummqwt.mongodb.net/CryptoCurrency",{
    useNewUrlParser:true  
}) 

.then(()=> console.log("MongoDB is connected"))  
.catch(err => console.log(err))


app.use("/",route) 

app.use( (req ,res) => {
    res.status(400).send({status : false , message :`Page Not Found , Given URL ${req.url} is incorrect for this application.`})
})

app.listen(process.env.PORT || 3000, function(){
    console.log("express app runing on port -"+(process.env.PORT || 3000) )
})