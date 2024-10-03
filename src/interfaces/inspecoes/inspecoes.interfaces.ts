export interface IRepositoryInspecoes<T> {
  create(data: T): Promise<T>
  findOne(id: string): Promise<T>
  update(id: string, data: Partial<T>): Promise<void>
  delete(id: string): Promise<void>
  findAll(): Promise<T[]>
}
