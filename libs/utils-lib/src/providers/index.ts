import * as Abstracts from '../abstracts';
import * as Services from '../services';

export const UtilsModuleProviders = [
  {
    provide: Abstracts.TokenService,
    useClass: Services.JwtService,
  },
  {
    provide: Abstracts.MessageSenderService,
    useClass: Services.MailSenderService,
  },
  {
    provide: Abstracts.HashService,
    useClass: Services.BcryptService,
  },
  {
    provide: Abstracts.GeneratorService,
    useClass: Services.CustomGeneratorService,
  },
];
