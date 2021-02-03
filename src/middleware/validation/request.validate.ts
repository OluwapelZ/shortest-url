import { inject, injectable } from 'inversify';
import * as yup from 'yup';
import { Logger } from '../../utils';
import { TYPES } from '../../constant';
import { ResponseMapper } from '../../utils';
import config from '../../config';

@injectable()
export class ValidateRequest {

    constructor(
        @inject(TYPES.ResponseMapper) private readonly responseMapper: ResponseMapper,
        @inject(TYPES.Logger) private readonly logger: Logger,
    ) {}

    encodeValidation = async (req: Express.Request, res: Express.Response, next: any) => {
        try {
            const encodeSchema = yup.object({
                url: yup.string()
                .test("is-url-valid", "URL is not valid", (value: any) => {
                    return this.isValidUrl(value);})
                .required()
            });
    
            await encodeSchema.validate(req['body']);
            return next();
        } catch (error) {
            this.logger.error(`Error occured on validating url: ${error.message}`);
            this.responseMapper.failed({res, message: error.message});
        }
    }

    decodeValidation = async (req: Express.Request, res: any, next: any) => {
        try {
            const encodeSchema = yup.object({
                url: yup.string()
                .test("is-url-valid", "URL is not valid", (value: any) => {
                    return this.isValidUrl(value);})
                .required()
            });
    
            const body = req['body'];
            await encodeSchema.validate(body);
            const shortenedUrl: string = body.url;
            req['body'].url = shortenedUrl.replace(config.shortedBaseUrl, '');
            return next();
        } catch (error) {
            this.logger.error(`Error occured on validating url: ${error.message}`);
            return this.responseMapper.failed({res, message: error.message});
        }
    }

    isValidUrl = (url: string) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(url);
    };
}