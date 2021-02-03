import config from "../../src/config";
import { InvalidUrlSlug } from "../../src/error";
import { UrlService } from "../../src/service";
import { LoggerMock, CacheMock } from "../helper/mock";

describe('Unit: Url Service', () => {
    afterEach(()=> {
        jest.restoreAllMocks();
    });

    const logger = new LoggerMock();
    const cacheMock = new CacheMock();
    const service = new UrlService(logger, cacheMock);

    it('Url service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should encode url and return a shortened url', async () => {
        const MOCK_LONG_URL = 'hello.twehtweh.com/sdfdsjkwerewefwr';

        const shortenedUrl = await service.encode(MOCK_LONG_URL);
        expect(shortenedUrl.replace(config.shortedBaseUrl, '')).toBeDefined();
    });

    it('should fail if slug does not exist: not tied to a url', async () => {
        try {
            jest.spyOn(cacheMock, 'getJson').mockResolvedValue(null);

            const SLUG_MOCK = 'slug';
            await service.decode(SLUG_MOCK);
        } catch (error) {
            expect(error instanceof InvalidUrlSlug).toBe(true);
        }
    });

    it('should decode url slug and return the original url', async () => {
        jest.spyOn(cacheMock, 'getJson').mockResolvedValue({
            originalUrl: "hello.twehtweh.com",
            slugCode: "5x7LgC80T..2",
        });

        const SLUG_MOCK = 'slug';
        const originalUrl = await service.decode(SLUG_MOCK);

        expect(originalUrl.slugCode).toBe("5x7LgC80T..2");
        expect(originalUrl.originalUrl).toBe('hello.twehtweh.com');
    });
});
