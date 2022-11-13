const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Get all
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Create
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null){
        res.user.name = req.body.name
    }
    if (req.body.phone != null){
        res.user.phone = req.body.phone
    }
    try {
        const updatedUser = await res.user.save()
        res.status(201).json(updatedUser)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'User deleted: ' + res.user.name })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next){
    let user
    try {
        user = await User.findById(req.params.id)
        if (!user){
            return res.status(404).json({ message: 'User not found' })
        }
    }
    catch (err) {
        if (user == undefined){
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router