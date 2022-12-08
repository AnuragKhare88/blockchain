const express=require('express')
const router=express.Router()
const crypto = require("../controller/cryptoController")



router.get('/cryptoCoins', crypto.getCrypto)

module.exports = router