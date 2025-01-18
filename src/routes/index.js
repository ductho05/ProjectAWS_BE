import Authrouter from "./authentication.js"

const ExcuteRoute = (app) => {

    app.use("/projectaws/api/v1/auth", Authrouter)
}

export default ExcuteRoute
