import { Router } from 'express'
import superheroRouter from './superhero'

const router = Router()

router.use('/', superheroRouter)

export default router
