export interface IExpressResponseMapper {
    res: any,
    message: string,
};

export interface ISuccess extends IExpressResponseMapper {
    data: any;
};

export interface IResponse {
    status: boolean;
    message: string;
    data: any;
};
