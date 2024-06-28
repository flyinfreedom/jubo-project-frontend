import { IPatient } from "../models/patient.model";
import axiosInstance from "./axiosInstance";

const getPatients = () => axiosInstance.get<IPatient[]>('/api/patient');

export { getPatients };