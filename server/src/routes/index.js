function routes(app){
    app.use("/api/user-register" , require("./userRoutes"))
    app.use("/api/admin" , require("./authRoutes"))
}

module.exports = routes