import diagnosesData from '../../data/diagnoses.json'
import { DiagnoseEntry } from '../types/types'

const diagnoses: DiagnoseEntry[] = diagnosesData

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses
}

export default {
  getDiagnoses
}
