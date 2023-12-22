import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ObjectId } from "typeorm/driver/mongodb/typings";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

export abstract class TypeormRepository<T> {
  protected repository: Repository<T>;
  protected constructor(repository: Repository<T>) {
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
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>
  ): Promise<boolean> {
    const result = await this.repository.update(criteria, partialEntity);
    return result.affected >= 1;
  }

  public async delete(id: string | number): Promise<boolean> {
    const result: DeleteResult = await this.repository.delete(id);
    return result.affected >= 1;
  }
}
