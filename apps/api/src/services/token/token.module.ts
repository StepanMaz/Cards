import {
    DynamicModule,
    ExistingProvider,
    FactoryProvider,
    Module,
    ValueProvider,
} from "@nestjs/common";
import { TokenService, type TokenServiceConfig } from "./token.service";
import { TOKEN_SERVICE_CONFIG } from "../../types&constants/constants";

@Module({})
export class TokenModule {
    static register(options: TokenModuleOptions): DynamicModule {
        const { access_token_expiration_time, refresh_token_expiration_time } =
            options;

        return {
            global: true,
            module: TokenModule,
            providers: [
                {
                    provide: TOKEN_SERVICE_CONFIG,
                    useValue: {
                        access_token_expiration_time,
                        refresh_token_expiration_time,
                    } as TokenServiceConfig,
                },
                TokenService,
            ],
            exports: [TokenService],
        };
    }

    static registerAsync(options: TokenModuleAsyncOptions): DynamicModule {
        return {
            global: true,
            module: TokenModule,
            providers: [
                {
                    provide: TOKEN_SERVICE_CONFIG,
                    ...options,
                },
                TokenService,
            ],
            exports: [TokenService],
        };
    }
}

type TokenModuleAsyncOptions =
    | Omit<ValueProvider<TokenModuleOptions>, "provide">
    | Omit<FactoryProvider<TokenModuleOptions>, "provide">
    | Omit<ExistingProvider<TokenModuleOptions>, "provide">;

export interface TokenModuleOptions {
    access_token_expiration_time: `${number}${"h" | "d" | "m"}`;
    refresh_token_expiration_time: `${number}${"h" | "d" | "m"}`;
}
