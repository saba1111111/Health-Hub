import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { CacheService } from 'libs/cache-lib';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly redisService: CacheService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = request.body?.consultationRequestId;

    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return of(JSON.parse(cachedData.toString()));
    }

    const response = next.handle().pipe(
      tap((data) => {
        this.redisService.add({
          key: cacheKey,
          value: JSON.stringify(data),
          expiration: 600,
        });
      }),
    );

    return response;
  }
}
