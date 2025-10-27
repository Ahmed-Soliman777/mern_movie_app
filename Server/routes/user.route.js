import express from 'express'
import { createUser, deleteUser, getProfile, login, logout, updateUser } from '../controllers/user.controller.js'
// import {  getAllUsers, getUser } from '../controllers/user.controller.js'

const app = express()

// app.get('/users', getAllUsers)
// app.get('/users/:id', getUser)

app.get('/profile', getProfile)

app.post('/register', createUser)

app.post('/login', login)

app.post('/logout', logout)

app.put('/users/:id', updateUser)

app.delete('/users/:id', deleteUser)

export default app