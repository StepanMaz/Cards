import {
    type DynamicModule,
    type ExistingProvider,
    type FactoryProvider,
    Module,
    type ValueProvider,
} from "@nestjs/common";
import { RedisClientOptions, createClient } from "redis";
import {
    REDIS_CONNECTION,
    REDIS_CONNECTION_OPTIONS,
} from "src/types&constants/constants";

@Module({})
export class RedisModule {
    static register(options: RedisModuleOptions): DynamicModule {
        const { global, ...module_options } = options;

        return {
            module: RedisModule,
            global,
            exports: [REDIS_CONNECTION_OPTIONS, REDIS_CONNECTION],
            providers: [
                {
                    provide: REDIS_CONNECTION,
                    async useFactory() {
                        const client = createClient(module_options);
                        await client.connect();
                        return client;
                    },
                },
                {
                    provide: REDIS_CONNECTION_OPTIONS,
                    useValue: module_options,
                },
            ],
        };
    }

    static registerAsync(options: RedisModuleAsyncOptions): DynamicModule {
        const { global, ...module_options } = options;

        return {
            module: RedisModule,
            global,
            exports: [REDIS_CONNECTION_OPTIONS, REDIS_CONNECTION],
            providers: [
                {
                    provide: REDIS_CONNECTION_OPTIONS,
                    ...module_options,
                },
                {
                    provide: REDIS_CONNECTION,
                    async useFactory(options: RedisClientOptions) {
                        const client = createClient(options);
                        await client.connect();
                        return client;
                    },
                    inject: [REDIS_CONNECTION_OPTIONS],
                },
            ],
        };
    }
}

type RedisModuleAsyncOptions = (
    | Omit<ValueProvider<RedisClientOptions>, "provide">
    | Omit<FactoryProvider<RedisClientOptions>, "provide">
    | Omit<ExistingProvider<RedisClientOptions>, "provide">
) & { global: boolean };

type RedisModuleOptions = RedisClientOptions & { global: boolean };
