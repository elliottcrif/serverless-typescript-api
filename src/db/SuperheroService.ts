import { Superhero } from '../models'
import { IDatabaseService } from './IDatabaseService'

export class SuperheroService implements IDatabaseService<Superhero> {
    getOne(itemId: string): Promise<Superhero> {
        throw new Error("Method not implemented.");
    }    
    getAll(): Promise<Superhero[]> {
        throw new Error("Method not implemented.");
    }
    updateOne(item: Superhero): Promise<Superhero> {
        throw new Error("Method not implemented.");
    }
    addOne(item: Superhero): Promise<Superhero> {
        throw new Error("Method not implemented.");
    }
    deleteOne(itemId: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}