import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { InvalidUrlSlug } from "../error";
import { TYPES } from "../constant";
import { UrlService } from "../service";
import { Logger, ResponseMapper,  } from "../utils";

@injectable()
class UrlController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: Logger,
        @inject(TYPES.ResponseMapper) private readonly responseMapper: ResponseMapper,
        @inject(TYPES.UrlService) private readonly urlService: UrlService,
    ) {}

    public encodeUrl = async (req: any, res: any) => {
        this.logger.info(`Encoding: shortening url`);

        const shortenedUrl = await this.urlService.encode(req.body.url);
        return this.responseMapper.success({
            res,
            message: 'Successfully shortened url',
            data: { shortenedUrl }
        });
    }

    public decodeUrl = async (req: any, res: any) => {
        try {
            this.logger.info(`Decoding endoded url`);
            const originalUrl = await this.urlService.decode(req.body.url);

            return this.responseMapper.success({
                res,
                message: 'Successfully decoded shortened url',
                data: { url: originalUrl }
            });
        } catch (error) {
            if (error instanceof InvalidUrlSlug) {
                return this.responseMapper.failed({res, status: StatusCodes.BAD_REQUEST, message: error.message})
            }

            return this.responseMapper.failed({res, status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Unknown error'})
        }
    }
}

export { UrlController };