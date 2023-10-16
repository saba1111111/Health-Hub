export interface BaseRepositoryInterface<Entity, CreateCredentials> {
  create(entity: CreateCredentials): Promise<Entity>;
  find(findOptions: Partial<Entity>): Promise<Entity[] | []>;
  findOne(findOptions: Partial<Entity>): Promise<Entity>;
  findAll(): Promise<Entity[] | []>;
  updateById(id: number, entity: Partial<Entity>): Promise<Entity>;
  deleteById(id: number): Promise<boolean>;
}
