import jwt from "jsonwebtoken"


function authonticate (req,res,next){


    const token = req.headers.authorization

    console.log(token)
    if(!token){
        return res.status(404).json({status: 404, message: "no token found"})

    }
    const tokenWithoutBearer = token.split(" ")[1];

    jwt.verify(tokenWithoutBearer ,  'SECTRET_KEY', (error, decoded)=> {
        if (error) {
            return res.status(401).json({
                message: "Authentication failed - invalid token",
            });
        }
        console.log("decedo" , decoded) 
        next();
    })



}


export default authonticate