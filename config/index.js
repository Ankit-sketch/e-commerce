import dotenv from 'dotenv'

dotenv.config()

export const { PORT, DEV, DB_URL, SECRET_KEY, REFRESH_KEY } = process.env
