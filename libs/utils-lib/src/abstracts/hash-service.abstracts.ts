import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashService {
  abstract hash(data: string | Buffer): Promise<string>;
  abstract compare(
    value: string | Buffer,
    encryptedValue: string,
  ): Promise<boolean>;
}
