import { ROLES, TABLES } from 'libs/common-lib';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: TABLES.USERS_TABLE })
class UsersEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public email: string;

  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  public verified: boolean;

  @Column({ type: 'enum', enum: ROLES, nullable: false })
  public role: string;
}

export { UsersEntity };
