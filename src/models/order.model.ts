export interface IOrder {
    id: string;
    message: string;
}

export interface IOrderSearchCondition {
    page: number;
    pageSize: number;
    orderIds: Array<string>;
}