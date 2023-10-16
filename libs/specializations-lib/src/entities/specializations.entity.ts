import { TABLES } from 'libs/common-lib';
import { ConsultationsRequestsEntity } from 'libs/consultations-requests-lib/entities';
import { DoctorsProfilesEntity } from 'libs/doctors-profiles-lib/entities';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TABLES.SPECIALIZATIONS_TABLE })
class SpecializationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column('varchar', { array: true, nullable: true })
  focused_areas: string[];

  @OneToMany(
    () => DoctorsProfilesEntity,
    (doctorsProfile) => doctorsProfile.specialization,
  )
  doctorsProfiles: Array<DoctorsProfilesEntity>;

  @ManyToMany(() => ConsultationsRequestsEntity)
  ConsultationsRequests: Array<ConsultationsRequestsEntity>;
}

export { SpecializationsEntity };
