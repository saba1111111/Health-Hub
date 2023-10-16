import { CitiesEntity } from 'libs/cities-lib/entities';
import { Genders, TABLES } from 'libs/common-lib';
import { SpecializationsEntity } from 'libs/specializations-lib/entities';
import { UsersEntity } from 'libs/users-lib/entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TABLES.CONSULTATIONS_REQUESTS_TABLE })
class ConsultationsRequestsEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int', name: 'min_age', nullable: true })
  public minAge: number;

  @Column({ type: 'int', name: 'max_age', nullable: true })
  public maxAge: number;

  @Column({ type: 'int', name: 'min_experience', nullable: true })
  public minExperience: number;

  @Column({ type: 'int', name: 'max_experience', nullable: true })
  public maxExperience: number;

  @Column({ type: 'int', name: 'min_rate_per_hour', nullable: true })
  public minRatePerHour: number;

  @Column({ type: 'int', name: 'max_rate_per_hour', nullable: true })
  public maxRatePerHour: number;

  @Column({ type: 'enum', enum: Genders, nullable: true })
  public gender: string;

  @ManyToMany(() => SpecializationsEntity)
  @JoinTable({ name: TABLES.PREFER_SPECIALIZATIONS_FOR_CONSULTATIONS_REQUESTS })
  specializations: Array<SpecializationsEntity>;

  @ManyToMany(() => CitiesEntity)
  @JoinTable({ name: TABLES.PREFER_CITIES_FOR_CONSULTATIONS_REQUESTS_TABLE })
  cities: Array<CitiesEntity>;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'patient_id' })
  patient: UsersEntity;

  @Column({ type: 'int', name: 'patient_id', nullable: false })
  patientId: number;
}

export { ConsultationsRequestsEntity };
