import express from "express"

let router = express.Router()

let initWebRoutes = (app) => {
    // router.get('/', (req, res) => {
    //     return res.send("Hello world")
    // })
    

    
    // return app.use("/", router);

    app.get("/login", (req, res) => {
        res.render('home')
    })

    
}

module.exports = initWebRoutes;