export interface Repository<T> {
  create(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  update(id: string | number, data: Partial<T>): Promise<T | null | boolean>;
  delete(id: string | number): Promise<boolean>;
}
