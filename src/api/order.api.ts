import { IOrder } from "../models/order.model";
import axiosInstance from "./axiosInstance";

const getOrder = (id: string) => axiosInstance.get<IOrder>(`/api/order/${id}`);
const searchOrder = (orderIds: string[]) => axiosInstance.post('/api/order/search', { orderIds });
const createOrder = (patientId: string, message: string) => axiosInstance.post<IOrder>('/api/order', { patientId, message });
const updateOrder = (orderId: string, message: string) => axiosInstance.put<IOrder>(`/api/order/${orderId}`, { message });

export { getOrder, createOrder, updateOrder, searchOrder };