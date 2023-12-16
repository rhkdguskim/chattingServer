export interface Repository<T> {
  create(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string | number): Promise<T | null>;
  update(id: string | number, data: Partial<T>): Promise<T | null | boolean>;
  delete(id: string | number): Promise<boolean>;
}
