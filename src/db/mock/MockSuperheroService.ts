import { IDatabaseService } from "../IDatabaseService";
import { Superhero } from "../../models";
import superheroDB from './mock.json'

type SuperheroDB = { [index: string]: Superhero }


export class MockSuperheroService implements IDatabaseService<Superhero> {
    db: SuperheroDB = Object.assign({}, superheroDB)

    async getOne(itemId: string): Promise<Superhero> {
        try {
            const superhero: Superhero = this.db[itemId]
            return superhero
        } catch (e) {
            throw Error(`Superhero with id: ${itemId} does not exist`)
        }
    }   
    async getAll(): Promise<Superhero[]> {
        return Object.keys(this.db).map(key => this.db[key])
     }
    async updateOne(item: Superhero): Promise<Superhero> {
        this.db[item.id] = item
        return this.db[item.id]
    }
    async addOne(item: Superhero): Promise<Superhero> {
        this.db[item.id] = item
        return this.db[item.id]
    }
    async deleteOne(itemId: string): Promise<Boolean> {
        delete this.db[itemId]
        return true
    }


}