const axios = require("axios")
const cryptoModel = require("../model/cryptoModel")


let getCrypto = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://api.coincap.io/v2/assets",
      headers: {
        Authorization: "Bearer 42053e51-a38c-4bba-9dd7-2721d7d20358",
      }

    }
    let result = await axios(options);
    let cryptoData = result.data.data
    cryptoData = cryptoData.sort((a, b) => { return a.changePercent24hr - b.changePercent24hr })
    let arr = []
    await cryptoModel.deleteMany({})
    for (let i=0; i<cryptoData.length; i++) {
      let x = cryptoData[i].name
      let y = cryptoData[i].symbol
      var Unique = await cryptoModel.find({ name: x, symbol: y })
      if (Unique.length == 0) {
        let obj = {}
        obj.symbol = cryptoData[i].symbol
        obj.name = cryptoData[i].name
        obj.marketCapUsd = cryptoData[i].marketCapUsd
        obj.priceUsd = cryptoData[i].priceUsd
        arr.push(obj)
        req.body = obj
        let data2 = await cryptoModel.create(obj)

      }
    }
    res.status(201).send({ status: true, data: cryptoData })
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ status: false, message: err.message })
  }
}

module.exports = { getCrypto }