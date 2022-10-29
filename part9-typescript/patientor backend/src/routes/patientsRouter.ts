import express from 'express'
import patientsService from '../services/patientsService'

const patientsRouter = express.Router()

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getPatientsCensored())
})

patientsRouter.post('/', (req, res) => {
  const { name, gender, occupation, dateOfBirth, ssn } = req.body
  const newPatient = { name, gender, occupation, dateOfBirth, ssn, id: 'new id' }
  res.send(newPatient)
})

export default patientsRouter
