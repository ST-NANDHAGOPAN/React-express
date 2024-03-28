function routes(app){
    app.use("/api/user-register" , require("./userRoutes"))
    app.use("/api/" , require("./authRoutes"))
}

module.exports = routes