import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
		bufferLogs: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	app.use(helmet());
	const config = new DocumentBuilder()
		.setTitle('Role Based')
		.setDescription('Role Based')
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			'jwt',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(process.env.PORT ?? 3000);
	console.log(`App is up and serve at PORT ${process.env.PORT ?? 3000}`);
}
bootstrap();
