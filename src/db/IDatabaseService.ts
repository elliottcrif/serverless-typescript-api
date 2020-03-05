export interface IDatabaseService<T> {
    getOne(itemId: String): Promise<T>;
    getAll(): Promise<T[]>;
    updateOne(item: T): Promise<T>;
    addOne(item: T): Promise<T>;
    deleteOne(itemId: String): Promise<Boolean>;
}
