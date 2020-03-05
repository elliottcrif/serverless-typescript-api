import { IDatabaseService } from "../IDatabaseService";
import { Superhero } from "../../models";
import superheroDB from './mock.json'
type SuperheroDB = { [index: string]: Superhero }
const db: SuperheroDB = superheroDB

export class MockSuperheroService implements IDatabaseService<Superhero> {
    async getOne(itemId: string): Promise<Superhero> {
        try {
            const superhero: Superhero = db[itemId]
            return superhero
        } catch (e) {
            throw Error(`Superhero with id: ${itemId} does not exist`)
        }
    }   
    async getAll(): Promise<Superhero[]> {
        return Object.keys(db).map(key => db[key])
     }
    async updateOne(item: Superhero): Promise<Superhero> {
        db[item.id] = item
        return db[item.id]
    }
    async addOne(item: Superhero): Promise<Superhero> {
        db[item.id] = item
        return db[item.id]
    }
    async deleteOne(itemId: string): Promise<Boolean> {
        delete db[itemId]
        return true
    }


}