import app from './app'
import config from '../config'

require('dotenv').config()

const { PORT = config.port } = process.env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
