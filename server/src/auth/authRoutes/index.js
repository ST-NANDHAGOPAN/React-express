function authRoutes(app){
    app.use("/api/admin" , require("./AdminRoutes"))
}

module.exports = authRoutes