/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry } from '../types/types'

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String
}
const parseString = (text: any): string => {
  if (!text || isString(text)) {
    throw new Error(`Incorrect or missing field: ${text}`)
  }
  return text
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}
const parseDate = (date: any): string => {
  if (!date || !isDate(date)) {
    throw new Error(`Incorrect or missing field date: ${date}`)
  }
  return date
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing field gender: ${gender}`)
  }
  return gender
}

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
  }
}

export default toNewPatientEntry
