export interface ResponseModel {
    code: number;
    message: string;
    status: boolean;
    data: object | object[];
}