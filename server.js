import express from 'express';
import dotenv from 'dotenv';

//configure env
dotenv.config(); // we give path where .env file is located since in our case it is in root directory no need to give
                // syntax ->  dotenv.config({path:'\ff'});

const app=express();

const PORT=process.env.PORT || 8080;


app.get("/",(req,res)=>{
    res.send("<h1>Welcome to BlissCart Bazaar</h1>");
});

app.listen(PORT,()=>{
    console.log(`Server listening on ${process.env.DEV_MODE} -- PORT ${PORT}`);
})
