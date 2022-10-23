const axios = require("axios");
const { Router } = require("express")
const router = Router()


router.get("/", (req, res) => {
    res.send("HOLAAAAAAAAAAAAAAA")
})

module.exports = router