//needs editting

import express from 'express'
import pinsRoute from './routes/pins.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/pins', pinsRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
