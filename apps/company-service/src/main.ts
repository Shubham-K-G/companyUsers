import { NestFactory } from '@nestjs/core';
import { CompanyServiceModule } from './company-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CompanyServiceModule);
  await app.listen(Number(process.env.PORT_COMPANY) || 3000);
}
bootstrap();
