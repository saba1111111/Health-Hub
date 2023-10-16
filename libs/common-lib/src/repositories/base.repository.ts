import { BaseRepositoryInterface } from 'libs/common-lib';
import { DeepPartial, Repository } from 'typeorm';

export class BaseRepository<Entity, CreateEntity extends DeepPartial<Entity>>
  implements BaseRepositoryInterface<Entity, CreateEntity>
{
  constructor(private readonly repository: Repository<Entity>) {}

  public create(entity: CreateEntity): Promise<Entity> {
    return this.repository.save(entity);
  }

  public find(findOptions: Partial<Entity>): Promise<[] | Entity[]> {
    const options: object = { where: findOptions };
    return this.repository.find(options);
  }

  public findOne(findOptions: Partial<Entity>): Promise<Entity> {
    const options: object = { where: findOptions };

    return this.repository.findOne(options);
  }

  public findAll(): Promise<Entity[] | []> {
    return this.repository.find();
  }

  public async updateById(
    id: number,
    entity: Partial<Entity>,
  ): Promise<Entity> {
    const whereCondition: object = { id };
    const updatedData: object = entity;

    await this.repository.update(whereCondition, updatedData);
    return this.findOne(whereCondition);
  }

  public async deleteById(id: number): Promise<boolean> {
    const whereCondition: object = { id };

    const result = await this.repository.delete(whereCondition);
    return !!result.affected;
  }
}
