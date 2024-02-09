import express from 'express'
import { test, registanimal, deleteanimal, updateanimal, listaranimals} from './animal.controller.js';

const api = express.Router();

api.get('/test', test)
api.post('/registanimal', registanimal)
api.delete('/deleteanimal', deleteanimal)
api.put('/updateanimal/:id', updateanimal)
api.get('/listaranimals', listaranimals)

export default api