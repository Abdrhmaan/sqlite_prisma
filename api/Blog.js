

import  express, { Router }  from "express";
import prisma from "./lip/index.js";
import authonticate from "./middlewares/index.js";

const rooteer = Router()


//get all blog
rooteer.get("/", async (req, res) => {
    try {
        
      

        const allblogs = await prisma.blog.findMany()
          

        if(!allblogs) {
            return res.status(404).json({status: 404, message: "blog not found"})
        }

        res.json(allblogs)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});


// one blog 

rooteer.get("/:id", async (req, res) => {
    try {
        
        const { id } = req.params;

        const one = await prisma.blog.findUnique({
            where: {
                id: Number(id),
            },
        });

        if(!one) {
            return res.status(404).json({status: 404, message: "blog not found"})
        }

        res.json(one)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});




// crated a blog

rooteer.post("/" ,authonticate, async(req,res) => {

    try {


        const {userid,title,contente} = req.body
        console.log(req.body)
       
        const blogs  =  await prisma.blog.create({
            data : {
                userid,
                title,
                contente

                
            }
            
        })
        if(!blogs){
            return res.status(401).json({mssege : "blog majjrio"})
        }

        return res.status(401).json({mssege : "created a blog" ,blogs })
      

 
  
    } catch(e) {
        console.log(e)
    }


})





// edited a blog

rooteer.put('/update_blog/:id', authonticate, async (req, res) => {
    try {
        
        const { id } = req.params;
        const {userid,title,contente} = req.body

        const updatblog = await prisma.blog.update({
            where: {
                id: Number(id),
            },
            
            data: {
                userid,
                title,
                contente
            },
        });

        if(!updatblog) {
            return res.status(400).json({status: 400, message: "blog was not updated!"})
        }

        res.status(200).json({status: 200, message: "blog successFully updated!"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});


// deleed a blog

rooteer.delete("/:id",authonticate,  async (req, res) => {
    try {
        
        const { id } = req.params;
      

        const deleted = await prisma.blog.delete({
            where: {
                id: Number(id),
            },
            
        });

        if(!deleted) {
            return res.status(400).json({status: 400, message: "dleled blog!"})
        }

        res.status(200).json({status: 200, message: "deledt successFully blog!"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});


export default rooteer