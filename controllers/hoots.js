import express from 'express'
import Hoot from '../models/hoot.js'
import isSignedIn from '../middleware/isSignedIn.js'

const router = express.Router()

//All routes are prefixed with :/hoots

export default router