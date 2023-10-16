import { SelectQueryBuilder } from 'typeorm';
import { DoctorsProfilesEntity } from '../entities';

export interface RangeFilterCredentials {
  queryBuilder: SelectQueryBuilder<DoctorsProfilesEntity>;
  table: string;
  column: string;
  minValue: number | undefined;
  maxValue: number | undefined;
}
