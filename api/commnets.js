

import  express, { Router }  from "express";
import prisma from "./lip/index.js";
import authonticate from "./middlewares/index.js";

const rooteer = Router()


// get all comente int blog
rooteer.get("/", async (req, res) => {
    try {
        
      

        const allcomete = await prisma.blog.findMany()
          

        if(!allcomete) {
            return res.status(404).json({status: 404, message: "allcomete not found"})
        }

        res.json(allcomete)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});



// get one comnte 
rooteer.get("/:id", async (req, res) => {
    try {
        
        const { id } = req.params;

        const one = await prisma.comente.findUnique({
            where: {
                id: Number(id),
            },
        });

        if(!one) {
            return res.status(404).json({status: 404, message: "comente not found"})
        }

        res.json(one)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});





// posted ac omente

rooteer.post("/poste" ,authonticate, async(req,res) => {

    try {


        const {comante,blogid,userid} = req.body
        console.log(req.body)
       
        const comente  =  await prisma.comente.create({
            data : {
              comante,
              userid,
              blogid,

                
            }
            
        })
        if(!comante){
            return res.status(401).json({mssege : "comente majjrio"})
        }

        return res.status(401).json({mssege : "comnete a blog" ,comente })
      

 
  
    } catch(e) {
        console.log(e)
    }


})






// updated comente

rooteer.put('/update_blog/:id',  async (req, res) => {
    try {
        
        const { id } = req.params;
        const {comante,  blogid  , userid,} = req.body

        const comenteupdated = await prisma.comente.update({
            where: {
                id: Number(id),
            },
            
            data: {
                userid,
                comante,
                blogid
            },
        });

        if(!comenteupdated) {
            return res.status(400).json({status: 400, message: "comente was not updated!"})
        }

        res.status(200).json({status: 200, message: "comente successFully updated!"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});


// delete comete 



rooteer.delete("/:id",  async (req, res) => {
    try {
        
        const { id } = req.params;
      

        const deleted = await prisma.comente.delete({
            where: {
                id: Number(id),
            },
            
        });

        if(!deleted) {
            return res.status(400).json({status: 400, message: "dleled comente!"})
        }

        res.status(200).json({status: 200, message: "deledt successFully comente!"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});
export default rooteer