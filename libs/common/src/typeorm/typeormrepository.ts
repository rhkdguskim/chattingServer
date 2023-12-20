import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class TypeormRepository<T> {
  protected repository: Repository<any>;
  protected constructor(repository: Repository<any>) {
    this.repository = repository;
  }

  public create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  public findAll(): Promise<T[]> {
    return this.repository.find();
  }

  public async update(
    id: string | number,
    data: QueryDeepPartialEntity<T>
  ): Promise<boolean> {
    const result = await this.repository.update(id, data);
    return result.affected >= 1;
  }

  public async delete(id: string | number): Promise<boolean> {
    const result: DeleteResult = await this.repository.delete(id);
    return result.affected >= 1;
  }
}
