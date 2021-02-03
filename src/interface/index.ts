export interface IExpressResponseMapper {
    res: any,
    status?: number,
    message: string,
};

export interface urlData {
    slug: string;
    longUrl: string;
    shortUrl: string;
}

export interface ISuccess extends IExpressResponseMapper {
    data: any;
};

export interface IResponse {
    status: boolean;
    message: string;
    data: any;
};
