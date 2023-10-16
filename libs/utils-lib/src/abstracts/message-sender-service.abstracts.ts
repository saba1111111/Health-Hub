import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MessageSenderService {
  abstract sendMessage(
    to: string,
    topic: string,
    message: string,
  ): Promise<any>;
}
