import { Container } from 'inversify';
import { TYPES } from '../constant';
import { UrlController } from '../controller';
import { UrlService } from '../service';
import { Logger, ResponseMapper } from '../utils';

const diContainer: Container = new Container();
diContainer.bind<Logger>(TYPES.Logger).to(Logger);
diContainer.bind<ResponseMapper>(TYPES.ResponseMapper).to(ResponseMapper);
diContainer.bind<UrlService>(TYPES.UrlService).to(UrlService);
diContainer.bind<UrlController>(TYPES.UrlController).to(UrlController);

export { diContainer };