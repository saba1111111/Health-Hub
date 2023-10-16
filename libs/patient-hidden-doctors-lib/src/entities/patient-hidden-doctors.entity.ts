import { TABLES } from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TABLES.PATIENT_HIDDEN_DOCTORS })
class PatientsHiddenDoctorsEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'patient_id' })
  patient: UsersEntity;

  @Column({ type: 'int', name: 'patient_id', nullable: false })
  patientId: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'doctor_id' })
  doctor: UsersEntity;

  @Column({ type: 'int', name: 'doctor_id', nullable: false })
  doctorId: number;
}

export { PatientsHiddenDoctorsEntity };
