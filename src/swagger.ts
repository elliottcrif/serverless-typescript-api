export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Portfolio API',
    description: 'Simple API to handle creating and managing a Portfolio',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  paths: {
    '/superheroes': {
      get: {
        tags: [
          'Superhero'
        ],
        summary: 'Get all superheros',
        responses: {
          200: {
            description: 'OK',
          },
          401: {
            description: 'NOT AUTHORIZED',
            schema: {
              $ref: '#/definitions/error'
            }
          },
          500: {
            description: 'INTERNAL SERVER ERROR',
            schema: {
              $ref: '#/definitions/error'
            }
          }
        }
      }
    }
  },
  definitions: {
    error: {
      properties: {
        message: {
          type: 'string'
        }
      }
    }
  }
}
