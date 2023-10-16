import { TABLES } from 'libs/common-lib';
import { ConsultationsRequestsEntity } from 'libs/consultations-requests-lib/entities';
import { CountriesEntity } from 'libs/countries-lib/entities';
import { DoctorsProfilesEntity } from 'libs/doctors-profiles-lib/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TABLES.CITIES_TABLE })
class CitiesEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'double precision', nullable: false })
  public longitude: number;

  @Column({ type: 'double precision', nullable: false })
  public latitude: number;

  @ManyToOne(() => CountriesEntity)
  @JoinColumn({ name: 'country_id' })
  country: CountriesEntity;

  @Column({ type: 'int', name: 'country_id', nullable: false })
  public countryId: number;

  @OneToMany(
    () => DoctorsProfilesEntity,
    (doctorsProfile) => doctorsProfile.cityId,
  )
  doctorsProfiles: Array<DoctorsProfilesEntity>;

  @ManyToMany(() => ConsultationsRequestsEntity)
  consultationsRequests: Array<ConsultationsRequestsEntity>;
}

export { CitiesEntity };
