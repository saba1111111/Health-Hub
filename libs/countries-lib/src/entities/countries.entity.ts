import { TABLES } from 'libs/common-lib';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: TABLES.COUNTRIES_TABLE })
class CountriesEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;
}

export { CountriesEntity };
