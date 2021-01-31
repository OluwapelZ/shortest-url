import { injectable } from "inversify";
import { request_statuses } from "../constant";
import { StatusCodes } from 'http-status-codes';
import { IExpressResponseMapper, ISuccess, IResponse } from "../interface";

/**
 * Generic JSEND Response Structure
 */
@injectable()
export class ResponseMapper {
    success(response: ISuccess): IResponse {
        const { res, message, data } = response;
        return res.status(StatusCodes.OK).send({status: request_statuses.SUCCESS, message: message, data: data});
    };
    
    failed(response: IExpressResponseMapper): IResponse {
        const { res, message } = response;
        return res.status(StatusCodes.BAD_REQUEST).send({status: request_statuses.FAIL, message: message, data: null});
    };
}
