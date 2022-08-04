import express from 'express';
import apiController from '../controller/apiController'
let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', apiController.getAllUser) //method Get -> read data
    router.post('/create-newUser', apiController.createNewUser)
    router.put('/update-user', apiController.updateUser)
    router.delete('/delete-user/:id', apiController.deleteUser)
    return app.use('/api/v1/', router)
}

export default initAPIRoute