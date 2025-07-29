import dotenv from 'dotenv'
import app from './app.js'
import {connectDB} from './src/database/db.index.js'
dotenv.config()

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is running on PORT: ${process.env.PORT}`)
         console.log(`mongodb connected to the server`)
    })
   
})
.catch((err)=>{
    console.log(`failed to connect mongodb with server ${err}`)
})