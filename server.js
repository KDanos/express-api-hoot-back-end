import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

//Middleware
import cors from 'cors'
import morgan from 'morgan'
import isSignedIn from './middleware/isSignedIn.js'

//Routers
import authRouter from './controllers/auth.js'
import hootRouter from './controllers/hoots.js'


//Create the application
const app = express()

//Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//Routes
app.use('/auth', authRouter)
app.use ('/hoots', hootRouter)

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.get('/secure-route', isSignedIn, (req, res) =>{
 res.json ('you have succesfull passed the isSignedIn verification')
})
//Connections
const connect = async () => {
    try {
        const mongoDB_URI = process.env.MONGODB_URI
        await mongoose.connect(mongoDB_URI)
        console.log('you have succesfully connected to the data base')
    } catch (error) {
        console.log(error)


    }
}
connect()
app.listen(3000, () => console.log(' The application is running on port 3000'))