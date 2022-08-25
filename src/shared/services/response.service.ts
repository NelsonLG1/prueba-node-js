import { Injectable } from "@nestjs/common";
import { ResponseModel } from "../models/response.model";

@Injectable()
export class ResponseService {
    private response: ResponseModel = {
        data: {},
        message: null,
        code:0,
        status:false
    };

    constructor(){}

    protected responseOK(data: object | object[], message: string = "Operación realizada con éxito", code: number = 201): ResponseModel {
        this.response.code = code;
        this.response.status = true;
        this.response.message = message;
        this.response.data = data;
        return this.response;
    }

    protected responseError(errorMessage: string, code:number = 401): ResponseModel {
        this.response.code = code;
        this.response.status = false;
        this.response.message = errorMessage;
        this.response.data = {};
        return this.response;
    }
}