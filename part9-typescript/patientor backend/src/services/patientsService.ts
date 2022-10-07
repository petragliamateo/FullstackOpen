import patientsData from '../../data/patients.json'
import { PatientEntry, PatientEntryCensored } from '../types/types'

const patients: PatientEntry[] = patientsData

const getPatients = (): PatientEntry[] => {
  return patients
}

const getPatientsCensored = (): PatientEntryCensored[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({ dateOfBirth, gender, id, name, occupation }))
}

export default {
  getPatients,
  getPatientsCensored
}
