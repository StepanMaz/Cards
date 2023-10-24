import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TOKEN_SERVICE_CONFIG } from "./token.module";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(TOKEN_SERVICE_CONFIG)
        private readonly config: TokenServiceConfig,
    ) {}

    generateAccessToken<T extends Record<string | number, any> = any>(
        payload: T,
    ): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.config.access_token_expiration_time,
        });
    }

    generateRefreshToken<T extends Record<string | number, any> = any>(
        payload: T,
    ): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.config.refresh_token_expiration_time,
        });
    }

    verify<T extends Record<string | number, any>>(token: string) {
        return this.jwtService.verifyAsync<T>(token);
    }
}

export interface TokenServiceConfig {
    access_token_expiration_time: string;
    refresh_token_expiration_time: string;
}
