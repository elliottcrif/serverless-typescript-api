export interface IDatabaseService<T> {
    getOne(itemId: string): Promise<T>;
    getAll(): Promise<T[]>;
    updateOne(item: T): Promise<T>;
    addOne(item: T): Promise<T>;
    deleteOne(itemId: string): Promise<Boolean>;
}
