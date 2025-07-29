import Router from 'Router'
import { register, login } from '../controllers/auth.controller.js'
const router=Router()
import upload from '../middlewares/multer.js'

router.post('/signup', upload.single('profilePic'), register)
router.post('/login', login)

export {router}