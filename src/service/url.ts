import { inject, injectable } from "inversify";
import { TYPES } from "../constant";
import { Logger } from "../utils";
import shortid from 'shortid';
import config from "../config";
import { Cache } from "../utils/cache";
import { BaseService } from "./base";
import { InvalidUrlSlug } from "../error";
import MD5 from 'crypto-js/md5';


@injectable()
export class UrlService extends BaseService {
    constructor(
        @inject(TYPES.Logger) private readonly logger: Logger,
        @inject(TYPES.Cache) private readonly cache: Cache,
    ) { super(); }

    public async encode(url: string): Promise<string> {
        this.logger.info(`Successfully encoded url`);

        const urlSlugSuffix = shortid.generate();
        const urlSlugPreffix = this.generateSlugId();
        const slugCode = `${urlSlugSuffix}.${urlSlugPreffix}`;

        const hashLongUrl = MD5(url).toString();
        const details = await this.cache.getJson(hashLongUrl);

        if (details) {
            return config.shortedBaseUrl + details.slugCode;
        }

        // For decode retrieval
        await this.cache.set(slugCode, JSON.stringify({
            originalUrl: url,
            slugCode,
        }));
        // For encode retrieval of same long url
        await this.cache.set(hashLongUrl, JSON.stringify({
            originalUrl: url,
            slugCode,
        }));

        return config.shortedBaseUrl + slugCode;
    }

    public async decode(slugCode: string): Promise<any> {
        this.logger.info(`Successfully decoded url`);
        
        const originalUrl = await this.cache.getJson(slugCode);
        if (!originalUrl) {
            this.logger.error(`Shortened Url "${config.shortedBaseUrl}/${slugCode}" is not mapped to any url`);
            throw new InvalidUrlSlug(`Shortened Url "${config.shortedBaseUrl}/${slugCode}" is not mapped to any url`);
        }

        return originalUrl;
    }
}