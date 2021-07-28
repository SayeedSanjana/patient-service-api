export const SwaggerOptions={
    
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title:"patient-service-api",
            description:"### *Patient Service Web Api For People to store their medical data*",
            version:"V1.0",
        },

        servers:[
            {
                url:`http://localhost:${process.env.PORT}`,
            }
        ],
    },
    apis:['index.js','./routes/*.js'],
};