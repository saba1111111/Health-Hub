import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { GeneratorService } from '../abstracts';

@Injectable()
export class CustomGeneratorService implements GeneratorService {
  public async generateUniqueValue(): Promise<string> {
    const randomBytes = crypto.randomBytes(16);
    const timestamp = Date.now();

    return crypto
      .createHash('sha256')
      .update(randomBytes + timestamp.toString())
      .digest('hex');
  }

  public genearteCode(digits: number): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
