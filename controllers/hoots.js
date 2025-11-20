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
        const hoots = await Hoot.find().populate('author')
        if(!hoots){
            throw new Error ('You should know that there are no hoots available')
        }
        res.json(hoots)
    } catch (error) {
        console.error('something went wrong in the Hoots index route')
        return res.status(400).json({ message: error.message })
    }
})

//Show a single hoot, GET
router.get('/:hootId',async (req, res) => {
    try {
        const hootId = req.params.hootId
        const myHoot = await Hoot.findById(hootId).populate('author')
        
        if(!myHoot){
            throw new Error ('constantinos did not find this hoot')
        }
        res.json(myHoot)
    } catch (error) {
        console.error ('something went wrong when showing the specific hoot')
        return res.status(400).json({message: error.message})
    }
    return res.json('You are testing the show a single hoot get route')
})

//Update a hoot, PUT
router.put('/:hootId', async (req, res) => {
    try {
        const hootId = req.params.hootId
        const hootUpdate = req.body
        const hoots = await Hoot.findByIdAndUpdate(hootId, hootUpdate)
        if(!hoots){
            throw new Erro ('This hoot hasnt been found either')
        }        
        res.json(hoots)

    } catch (error) {
        console.error('something went wrong in the Hoots update route')
        return res.status(400).json({ message: error.message })
    }
})
    

//Delete a hoot, DELETE
router.delete('/:hootId', isSignedIn, async (req, res) => {
    try {
      const {hootId} = req.params
      const hoot = await Hoot.findById(hootId)
      if (!hoot){
        throw new Error ('Cannot delete a hoot that cannot be found')
      }
      console.log ('req.user is: ',req.user)
     if (!hoot.author.equals(req.user._id)){
        throw new Error('you do not have the appropriate permissions to delete this hoot')
      }
      await Hoot.findByIdAndDelete(hootId)
      res.sendStatus(204)

    } catch (error) {
        console.error ('Something went wrong when deleting this hoot')
        return res.status (400).json({message:error.message})

    }
    
})

//Create a comment, POST
router.post('/:hootId/comments', (req, res) => {
    return res.json('You are testing the create a comment post route')
})


export default router