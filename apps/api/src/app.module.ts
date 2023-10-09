import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGatewayModule } from '#/gateway/gameGateway.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './controllers/auth/auth.module';

@Module({
  imports: [
    GameGatewayModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'client', 'dist')
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
