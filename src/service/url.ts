import { inject, injectable } from "inversify";
import { TYPES } from "../constant";
import { Logger } from "../utils";

@injectable()
export class UrlService {
    constructor(
        @inject(TYPES.Logger) private readonly logger: Logger,
    ) {}

    public encode(url: string): string {

        return;
    }

    public decode(url: string): string {
        return ;
    }
}