import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AppModule } from './app.module';

const result = dotenv.config({ path: path.join(__dirname, '..', '.env') });
// Manually override environment variables from parsed values
// This ensures .env file values take precedence over system environment variables
if (result.parsed) {
  Object.keys(result.parsed).forEach(key => {
    process.env[key] = result.parsed[key];
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
