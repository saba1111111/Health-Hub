import { Genders } from 'libs/common-lib';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

class BaseProfileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', name: 'firstname', nullable: false })
  public firstName: string;

  @Column({ type: 'varchar', name: 'lastname', nullable: false })
  public lastName: string;

  @Column({ type: 'varchar', nullable: false })
  public phone: string;

  @Column({ type: 'varchar', name: 'personalnumber', nullable: false })
  public personalNumber: string;

  @Column({ type: 'date', name: 'date_of_birth', nullable: false })
  public dateOfBirth: Date;

  @Column({ type: 'enum', enum: Genders, nullable: false })
  public gender: string;
}

export { BaseProfileEntity };
