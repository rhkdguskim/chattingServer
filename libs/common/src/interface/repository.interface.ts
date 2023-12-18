export interface Repository<T> {
  create(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  update(id: number, data: Partial<T>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
