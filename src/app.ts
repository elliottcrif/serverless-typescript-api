import serverless from 'serverless-http'
import { app } from './server'

module.exports.handler = serverless(app)
