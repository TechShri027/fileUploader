import express from 'express'
import cors from 'cors'
import { router } from './src/routes/auth.route.js'
const app=express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', router)

export default app