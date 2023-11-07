(async()=>{
    "use strict";

    // Dependencies
    const { MongoClient } = require("mongodb")
    const express = require("express")
    
    // Variables
    const pao = {
        masterKey: "Pao",
        mongoDB: ""
    }

    const web = express()
    const port = process.env.PORT || 8080

    const client = new MongoClient(pao.mongoDB)
    const database = client.db("core")
    const users = database.collection("pao.users")
    
    // Main
    console.log("Connecting to the database, please wait...")
    await client.connect()
    console.log("Successfully connected to the database.")

    web.use((req, res, next)=>{
        if(req.headers["pao-sk"] !== pao.masterKey) return res.redirect("https://cspi.network/")

        next()
    })

    web.get("/pverify", async(req, res)=>{
        const { code } = req.query
    
        if(!code) return res.json({ status: "failed" })
        
        const exists = await users.findOne({ code: code })

        if(!exists) return res.json({
            status: "failed",
            message: "Invalid code query."
        })
        if(exists && exists.verified) return res.json({ status: "already" })

        await users.updateOne({ code: code }, { $set: { verified: true } })
        res.json({ status: "verified" })
    })
    
    web.use("*", (req, res)=>res.redirect("https://cspi.network/"))
    web.listen(port, ()=>console.log(`Website is running. Port: ${port}`))
})()