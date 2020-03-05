import { Router } from 'express'
import { MockSuperheroService } from '../db/mock/MockSuperheroService'
import { Superhero } from '../models'

const router = Router()
const superheroService = new MockSuperheroService()

router.get('/superheroes', async (req, res) => {
  try {
    const superheroes = await superheroService.getAll()
    res.send({ superheroes, count: superheroes.length })
  } catch (e) {
    res.status(500).send({ error: { message: e.message || 'Unknown Internal Server Error' } })
  }
})

router.get('/superheroes/:superheroID', async (req, res) => {
  try {
    const superheroID = req.params.superheroID
    const superhero = await superheroService.getOne(superheroID)
    res.send({ ...superhero })
  } catch (e) {
    res.status(500).send({ error: { message: e.message || 'Unknown Internal Server Error' } })
  }
})

router.put('/superheroes/:superheroID', async (req, res) => {
  try {
    const input: Superhero = req.body.superhero
    const superhero = await superheroService.updateOne(input)
    res.send({ ...superhero })
  } catch (e) {
    res.status(500).send({ error: { message: e.message || 'Unknown Internal Server Error' } })
  }
})


router.post('/superheroes', async (req, res) => {
  try {
    const input: Superhero = req.body.superhero
    const superhero = await superheroService.addOne(input)
    res.send({ ...superhero, createdAt: new Date().toISOString() })
  } catch (e) {
    res.status(500).send({ error: { message: e.message || 'Unknown Internal Server Error' } })
  }
})

export default router
