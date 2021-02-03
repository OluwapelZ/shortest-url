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

    encodeValidation = async (req: any, res: any, next: any) => {
        try {
            const encodeSchema = yup.object({
                url: yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter a valid url to encode'
                ).required()
            });
    
            await encodeSchema.validate(req.body);
            return next();
        } catch (error) {
            this.logger.error(`Error occured on validating url: ${error.message}`);
            this.responseMapper.failed({res, message: error.message});
        }
    }

    decodeValidation = async (req: any, res: any, next: any) => {
        try {
            const encodeSchema = yup.object({
                url: yup.string()
                .required()
            });
    
            await encodeSchema.validate(req.body);
            const shortenedUrl: string = req.body.url;
            req.body.url = shortenedUrl.replace(config.shortedBaseUrl, '');
            return next();
        } catch (error) {
            this.logger.error(`Error occured on validating url: ${error.message}`);
            this.responseMapper.failed({res, message: error.message});
        }
    }
}