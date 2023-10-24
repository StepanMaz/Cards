import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    constructor(
        private readonly user_repo: UserRepository,
        private readonly token_service: TokenService,
    ) {}

    public async singIn(data: SignInData) {
        const user = await this.user_repo.findByUsernameOrEmail(
            data.identifier,
        );

        if (!user || !user.isValidPassword(data.password)) {
            throw new UnauthorizedException(
                "Invalid username/email or password",
            );
        }

        return this.createTokenPair({ sub: user.id }, { sub: user.id });
    }

    public async singUp(data: SignUpData) {
        const user = new User();

        user.email = data.email;
        user.username = data.username;
        user.setPassword(data.password);

        const new_user = await this.user_repo.add(user);

        return this.createTokenPair({ sub: new_user.id }, { sub: new_user.id });
    }

    public async refreshAccessToken(refreshToken: string) {
        try {
            const decoded =
                await this.token_service.verify<RefresgTokenPaylod>(
                    refreshToken,
                );

            return this.createTokenPair(
                { sub: decoded.sub },
                { sub: decoded.sub },
            );
        } catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw new UnauthorizedException("Invalid refresh token");
        }
    }

    private async createTokenPair(
        access: AccessTokenPaylod,
        refresh: RefresgTokenPaylod,
    ) {
        return {
            access_token: await this.token_service.generateAccessToken(access),
            refresh_token:
                await this.token_service.generateRefreshToken(refresh),
        };
    }
}

export type AccessTokenPaylod = {
    sub: number;
};

export type RefresgTokenPaylod = {
    sub: number;
};

type SignInData = {
    identifier: string;
    password: string;
};

interface SignUpData {
    username: string;
    email: string;
    password: string;
}
