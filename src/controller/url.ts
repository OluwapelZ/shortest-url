import { inject, injectable } from "inversify";
import { TYPES } from "../constant";
import { IResponse } from "../interface";
import { UrlService } from "../service";
import { Logger, ResponseMapper,  } from "../utils";

@injectable()
export class UrlController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: Logger,
        @inject(TYPES.ResponseMapper) private readonly responseMapper: ResponseMapper,
        @inject(TYPES.UrlService) private readonly urlService: UrlService,
    ) {}

    public encodeUrl(req, res): IResponse {
        console.log(this.urlService)
        console.log(req.body);
        this.logger.info(`Encoding: shortening url: ${req.body.url}`);

        const shortenedUrl = this.urlService.encode(req.body.url);
        return this.responseMapper.success({
            res,
            message: 'Successfully shortened url',
            data: { url: shortenedUrl }
        });
    }

    public decodeUrl(req, res): IResponse {
        this.logger.info(`Decoding shortened url: ${req.body.url}`);

        const shortenedUrl = this.urlService.decode(req.body.url);
        return this.responseMapper.success({
            res,
            message: 'Successfully decoded shortened url',
            data: { url: shortenedUrl }
        });
    }
}