import test from 'blue-tape'
import { v4 } from 'uuid'
import { MockSuperheroService } from '../db/mock/MockSuperheroService'
import { Superhero } from '../models'

test('SuperheroService should return a list of superheroes', async (t: test.Test) => {
    const superheroService = new MockSuperheroService()
    let superheroes = await superheroService.getAll()
    t.assert(superheroes.length === 3, 'Length should be 3 in mock db')
})

test('Superhero Service should return superhero by id', async (t: test.Test) => {
    const superheroService = new MockSuperheroService()

    let superheroes = await superheroService.getAll()
    for (const superhero of superheroes) {
        let dbValue = await superheroService.getOne(superhero.id)
        t.deepEquals(superhero, dbValue, `Service should return correct data by ID: ${superhero.id}`)
    }
}) 

test('Superhero Service should update superhero by ID', async (t: test.Test) => {
    const superheroService = new MockSuperheroService()

    let superheroes = await superheroService.getAll()
    for (const superhero of superheroes) {
        superhero.powers.push('new power')
        let updatedValue = await superheroService.updateOne(superhero)
        t.deepEquals(superhero, updatedValue, `Service should update superhero by ID: ${superhero.id}`)
    }
}) 

test('Superhero Service should delete superhero by ID', async (t: test.Test) => {
    const superheroService = new MockSuperheroService()

    let superheroes = await superheroService.getAll()
    for (const superhero of superheroes) {
        let updatedValue = await superheroService.deleteOne(superhero.id)
        t.assert(updatedValue, `Service should update superhero by ID: ${superhero.id}`)
    }
    t.assert((await superheroService.getAll()).length === 0, 'DB should be empty')
}) 

test('Superhero Service should delete superhero by ID', async (t: test.Test) => {
    const superheroService = new MockSuperheroService()

    let newSuperhero: Superhero = {
        id: v4(),
        name: 'Spiderman',
        alterEgo: 'Peter Parker',
        powers: [],
        publisher: '',
        images: []
    }
    await superheroService.addOne(newSuperhero)
    let superheroes = await superheroService.getAll()
    t.assert(superheroes.length === 4, 'DB should be empty')
}) 


