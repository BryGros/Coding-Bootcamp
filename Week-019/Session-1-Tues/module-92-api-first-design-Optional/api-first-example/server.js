const express = require('express')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path')
const postRoutes = require('./routes/postRoutes')

const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Load OpenAPI specification from swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'))

// Serve Swagger UI at /api-docs with proper options
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    url: null
  }
}))

// Use post routes
app.use('/posts', postRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Simple Blog API - API-First Design Example',
    documentation: `http://localhost:${port}/api-docs`,
    endpoints: {
      'GET /posts': 'Get all posts',
      'POST /posts': 'Create a new post',
      'GET /posts/:id': 'Get a post by ID'
    }
  })
})

app.listen(port, () => {
  console.log(`\nServer running at http://localhost:${port}`)
  console.log(`Swagger UI available at http://localhost:${port}/api-docs\n`)
  console.log('API-First Design Workflow:')
  console.log('1. swagger.yaml was created FIRST (defines the API)')
  console.log(`2. View it at http://localhost:${port}/api-docs`)
  console.log('3. Code in routes/ and controllers/ implements the API\n')
})
