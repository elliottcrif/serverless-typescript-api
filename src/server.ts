'use strict'
import swaggerUI from 'swagger-ui-express'
import swagger from './swagger'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from './routes'
export const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(router)
app.use(morgan('common'))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger))

export const listen = () => app.listen(port, () => console.log(`Example app listening on port ${port}!`))
