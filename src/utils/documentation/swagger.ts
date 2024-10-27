import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Estiam Nest REST API')
  .setDescription('Fullstack Backend course correction API')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    description: 'The JWT retrieved from the login endpoint',
  })
  .addTag('users', 'Operations about users')
  .addTag('auth', 'Operations about authentication')
  .build();
