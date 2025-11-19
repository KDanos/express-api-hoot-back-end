import express from 'express'
import Hoot from '../models/hoot.js'
import isSignedIn from '../middleware/isSignedIn.js'

const router = express.Router()

//All routes are prefixed with :/hoots

//Create a hoot, POST
router.post('/', isSignedIn, async (req, res) => {
    try {
        req.body.author = req.user
        const hoot = await Hoot.create(req.body)
        return res.status(201).json(hoot)
    } catch (error) {
        console.error('Something went wrong when creating a new hoot')
        return res.status(400).json({ message: error.message })
    }
})

//List Hoots GET
router.get('/', async (req, res) => {
    try {
        const hoots = await Hoot.find().populate ('author')
        res.json(hoots)
        // return res.json('You are testing the list hoots get route')
    } catch (error) {
        console.error('something went wrong in the Hoots index route')
        return res.status(400).json({ message: error.message })
    }
})

//Show a single hoot, GET
router.get('/:hootId', (req, res) => {
    return res.json('You are testing the show a single hoot get route')
})

//Update a hoot, PUT
router.put('/:hootId', (req, res) => {
    return res.json('You are testing the update a hoot put route')
})

//Delete a hoot, DELETE
router.delete('/:hootId', (req, res) => {
    return res.json('You are testing the delete a hoot delete route')
})

//Create a comment, POST
router.post('/:hootId/comments', (req, res) => {
    return res.json('You are testing the create a comment post route')
})


export default router