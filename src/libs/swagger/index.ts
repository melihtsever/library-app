import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type DocProperties = { title: string; description: string; version: string };

export function setupSwagger(
  docProperties: DocProperties,
  app: INestApplication,
  path: string,
) {
  const config = new DocumentBuilder()
    .setTitle(docProperties.title || 'Documentation')
    .setDescription(docProperties.description || 'Description')
    .setVersion(docProperties.version || '1.0.0')
    .addBearerAuth({
      type: 'http',
      description: 'JWT token with Bearer as prefix',
      name: 'Authorization',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addSecurityRequirements('bearer')
    .addSecurityRequirements('ApiKeyAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document, {
    customSiteTitle: docProperties.title || 'Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  });
}
