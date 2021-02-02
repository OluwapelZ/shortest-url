import { inject, injectable } from "inversify";
import { TYPES } from "../constant";
import { Logger } from "../utils";

@injectable()
export class UrlService {
    constructor(
        @inject(TYPES.Logger) private readonly logger: Logger,
    ) {}

    public encode(url: string): string {
        this.logger.info(`Successfully encoded url`);
        return;
    }

    public decode(url: string): string {
        this.logger.info(`Successfully decoded url`)
        return ;
    }
}