import { DocumentBuilder } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('AgroChem Swagger API')
  .setDescription('API documentation for AgroChem')
  .setVersion('1.0')
  .build();

export { swaggerOptions };
