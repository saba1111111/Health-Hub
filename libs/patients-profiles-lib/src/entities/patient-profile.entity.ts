import { BaseProfileEntity, TABLES } from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib/entities';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: TABLES.PATIENTS_PROFILES_TABLE })
class PatientsProfilesEntity extends BaseProfileEntity {
  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: 'patient_id' })
  user: UsersEntity;

  @Column({ type: 'int', name: 'patient_id', nullable: false })
  patientId: number;
}

export { PatientsProfilesEntity };
