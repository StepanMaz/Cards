import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { GameGatewayModule } from "./gateway/gateway.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ControllersModule } from "./controllers/controllers.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { app_config } from "./typeorm.config";
import { ServicesModule } from "./services/services.module";
import { TokenModule } from "./services/token/token.module";
import { JwtModule } from "@nestjs/jwt";
import { REDIS_CONNECTION } from "./types&constants/constants";
import { createClient } from "redis";
import { RedisModule } from "./services/redis.module";

@Module({
    imports: [
        GameGatewayModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(app_config),
        ControllersModule,
        JwtModule.registerAsync({
            global: true,
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow("JWT_SECRET"),
            }),
            inject: [ConfigService],
            imports: [ConfigModule],
        }),
        TokenModule.register({
            access_token_expiration_time: "1h",
            refresh_token_expiration_time: "1m",
        }),
        ServicesModule,
        RedisModule.registerAsync({
            global: true,
            useFactory(config: ConfigService) {
                return {
                    password: config.getOrThrow("REDIS_PASSWORD"),
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
