import { TABLES } from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TABLES.REFRESH_TOKENS_TABLE })
class RefreshTokensEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text', nullable: false })
  public token: string;

  @Column({ type: 'text', name: 'device_id', nullable: false })
  public deviceId: string;

  @Column({ type: 'date', name: 'expire_date', nullable: false })
  public expireDate: Date;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;
}

export { RefreshTokensEntity };
