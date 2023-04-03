import * as dotenv from 'dotenv'
dotenv.config()

export default {
  port: parseInt(process.env.PORT as string, 10) || 8080,
}
