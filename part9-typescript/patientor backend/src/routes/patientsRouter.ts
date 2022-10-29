import express from 'express'
import patientsService from '../services/patientsService'
import toNewPatientEntry from '../utils/utils'

const patientsRouter = express.Router()

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getPatientsCensored())
})

patientsRouter.post('/', (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body)
    const addedEntry = patientsService.addEntry(NewPatientEntry)
    res.json(addedEntry)
  } catch {
    res.status(400)
  }
})

export default patientsRouter
