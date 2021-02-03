import { LoggerMock, ResponseMapperMock } from "../../helper/mock";
import { ValidateRequest } from '../../../src/middleware/validation/request.validate';

describe('Middleware: Request', () => {
    afterEach(()=> {
        jest.restoreAllMocks();
    });

    const logger = new LoggerMock();
    const responseMapper = new ResponseMapperMock();
    const validationMiddleware = new ValidateRequest(responseMapper, logger);
    it('should be defined', () => {
        expect(validationMiddleware).toBeDefined();
    });
});
