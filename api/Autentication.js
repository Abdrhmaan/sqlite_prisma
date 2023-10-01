

import  express, { Router }  from "express";
import prisma from "./lip/index.js";
import bcrypte from "bcrypt"
import  jwt  from "jsonwebtoken";
const rooteer = Router()
import authonticate from "./middlewares/index.js";

rooteer.post("/signup" , async(req,res) => {

    try {


        const {email,name,password,bio} = req.body
       
        const extingowner  =  await prisma.user.findUnique({
            where: {
                email:email
            }
        })
        if(extingowner){
            return res.status(401).json({mssege : "email is al redy taken"})
        }

      //  const hasedpassword =  bcyrpte.hash(password,10)
      const hashedpassword =  await bcrypte.hash(password , 10)

        const newuser =  await prisma.user.create({
            data: {
                name:name,
                email:email,
                password: hashedpassword,
                bio:bio
            }
        })
        return res.status(200).json({msseg: "created from acconte" ,newuser})
    } catch(e) {
        console.log(e)
    }


})



// login  page 


rooteer.post("/login" , async(req,res) => {

    try{

        const {email , password} = req.body

        const finduser =  await prisma.user.findUnique({
            where : {
                email:email
            }
        })

        if(!finduser){

            return res.status(401).json({mssege : "no acconte !"})
        }
        
        const iscomprepssword = await bcrypte.compare(password , finduser.password)
        if (!iscomprepssword) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }

        const Token  = jwt.sign(
            {
            id:finduser.id,
            email:finduser.email
        },
        'SECTRET_KEY',
        {expiresIn: "1h"}
        
        )

        
        return res.status(200).json({
            message: "Owner logged in successfully",
            Token: Token,
          });

    } catch(e){
        console.log(e)
    }


})

export default rooteer