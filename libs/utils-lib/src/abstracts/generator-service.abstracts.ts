import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class GeneratorService {
  abstract generateUniqueValue(): Promise<string>;
  abstract genearteCode(digits: number): number;
}
