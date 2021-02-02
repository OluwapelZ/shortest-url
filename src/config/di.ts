import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../constant';
import { UrlController } from '../controller';
import { UrlService } from '../service';
import { Logger, ResponseMapper } from '../utils';
import { ValidateRequest } from '../middleware/validation/request.validate';

const container: Container = new Container();
container.bind<Logger>(TYPES.Logger).to(Logger);
container.bind<ResponseMapper>(TYPES.ResponseMapper).to(ResponseMapper);
container.bind<UrlService>(TYPES.UrlService).to(UrlService);
container.bind<UrlController>(TYPES.UrlController).to(UrlController);
container.bind<ValidateRequest>(TYPES.ValidateRequest).to(ValidateRequest);

export { container };