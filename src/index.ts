import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import short from 'short-uuid'
import pinoHttp from 'pino-http'
import {Logger} from 'pino'
import config from './config'

interface LoogerRequest extends Request {
  logger: Logger
}

const httpLogger = pinoHttp({
  name: 'GoogleSearchAPI',
  level: 'debug',
  genReqId: short.generate,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers["x-api-key"]',
      'res.headers',
    ],
    remove: true,
  },
})

const app = express()

app.use(helmet())
app.use(cors())
app.use(httpLogger)
app.use(express.json())

app.get('/', (req: LoogerRequest, res: Response) => {
  res.json({
    message: 'Hello World!'
  })
})

app.use((req: Request, res: Response) => {
  res.sendStatus(404)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Service got an unexpected error, please try later or contact admin!')
})

app.listen(config.port, () => {
  httpLogger.logger.info(`Application started on port ${config.port}!`)
})
