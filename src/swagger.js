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
    '/{userId}/portfolio': {
      get: {
        tags: [
          'Portfolio'
        ],
        summary: 'Get all portfolio items for a user',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'the userId of the user to get portfolio items for',
            required: true,
            schema: {
              type: 'string'
            },
            style: 'simple'
          }
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/portfolioItem'
            }
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
    portfolioItem: {
      properties: {
        title: {
          type: 'string'
        }
      }
    },
    error: {
      properties: {
        message: {
          type: 'string'
        }
      }
    }
  }
}
