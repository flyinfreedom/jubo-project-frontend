import { IOrder } from "../models/order.model";
import axiosInstance from "./axiosInstance";

const searchOrder = (orderIds: string[]) => axiosInstance.post('/api/order/search', { orderIds });
const createOrder = (patientId: string, message: string) => axiosInstance.post<IOrder>('/api/order', { patientId, message });
const updateOrder = (orderId: string, message: string) => axiosInstance.put<IOrder>(`/api/order/${orderId}`, { message });

export { createOrder, updateOrder, searchOrder };