export interface AddValue {
  key: string | Buffer;
  value: string | number | Buffer;
}

export interface AddValueWithExpiration extends AddValue {
  expiration: number;
}

export interface AddValueWithOptionalExpiration extends AddValue {
  expiration?: number;
}

export type CacheKey = string | Buffer;
