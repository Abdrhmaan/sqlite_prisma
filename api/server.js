import  express  from "express";

import Authenticate from "./Autentication.js"
import Blogrouer  from "./Blog.js"
import Comenreroter from "./commnets.js"


const server  = express()


server.use(express.json())



server.use("/api/authentication" , Authenticate)
server.use("/api/authentication" , Blogrouer)
server.use("/api/commete" , Comenreroter)







export default server