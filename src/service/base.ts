import { injectable } from "inversify";
import { AES } from 'crypto-ts';

@injectable()
export class BaseService {
    generateSlugId(): string {
        const check = Math.random().toString().substring(
            Math.floor((Math.random() * 10) + 1),
            Math.floor((Math.random() * 10) + 1)
            );

        return check;
    }

    generateUrlHash(url: string): string{
        return AES.encrypt(url, 'hash-key').toString();
    }
}
