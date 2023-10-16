import { UsersEntity } from 'libs/users-lib/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseProfileEntity, TABLES } from 'libs/common-lib';
import { CitiesEntity } from 'libs/cities-lib/entities';
import { SpecializationsEntity } from 'libs/specializations-lib/entities';

@Entity({ name: TABLES.DOCTORS_PROFILES_TABLE })
class DoctorsProfilesEntity extends BaseProfileEntity {
  @Column({ type: 'integer', name: 'experience_in_years', nullable: false })
  experienceInYears: number;

  @Column({ type: 'double precision', name: 'rate_per_hour', nullable: false })
  ratePerHour: number;

  @ManyToOne(
    () => SpecializationsEntity,
    (specialization) => specialization.doctorsProfiles,
  )
  @JoinColumn({ name: 'specialization_id' })
  specialization: SpecializationsEntity;

  @Column({ type: 'int', name: 'specialization_id', nullable: false })
  specializationId: number;

  @ManyToOne(() => CitiesEntity, (city) => city.doctorsProfiles)
  @JoinColumn({ name: 'city_id' })
  city: CitiesEntity;

  @Column({ type: 'int', name: 'city_id', nullable: false })
  cityId: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: 'doctor_id' })
  user: UsersEntity;

  @Column({ type: 'int', name: 'doctor_id', nullable: false })
  doctorId: number;
}

export { DoctorsProfilesEntity };
