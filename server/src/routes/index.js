function routes(app){
    app.use("/api/user-register" , require("./UserRoutes"))
}

module.exports = routes