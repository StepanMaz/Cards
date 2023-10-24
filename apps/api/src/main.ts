import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ["debug", "log", "warn", "error", "fatal"],
    });
    app.setGlobalPrefix("api");
    await app.listen(3000);
}
bootstrap();
