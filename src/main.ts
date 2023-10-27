import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtExceptionFilter } from './commons/filter/jwt-exception.filter';
import { TransformInterceptor } from './commons/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.getOrThrow('SERVER_PORT');

    app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new JwtExceptionFilter());

    await app.listen(PORT);
}
bootstrap();
