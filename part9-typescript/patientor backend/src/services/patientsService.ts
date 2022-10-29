import patientsData from '../../data/patients.json'
import { NewPatientEntry, PatientEntry, PatientEntryCensored } from '../types/types'

const patients: PatientEntry[] = patientsData

const getPatients = (): PatientEntry[] => {
  return patients
}

const getPatientsCensored = (): PatientEntryCensored[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({ dateOfBirth, gender, id, name, occupation }))
}

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newEntry = {
    ...entry,
    id: Math.floor(Math.random() * 1000).toString()
  }
  patientsData.push(newEntry)
  return newEntry
}

export default {
  getPatients,
  getPatientsCensored,
  addEntry
}
