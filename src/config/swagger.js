import __dirname from "../dirname.js"

const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Documentación de la API del Ecommerce',
        description: 'Proyecto Coderhouse 2022'
      }
    },
    apis: [`${ __dirname}/docs/*.yaml`]
  };

  export default swaggerOptions