import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        const connectInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`mongodb connected ${connectInstance.connection.host}`)
    } catch (error) {
        console.log(`failed to connect mongodb ${error}`)
        process.exit(1)
    }
}

export {connectDB}