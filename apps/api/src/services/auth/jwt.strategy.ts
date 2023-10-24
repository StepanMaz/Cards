import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AccessTokenPaylod } from ".";
import { HttpContextUser } from "src/types&constants/auth";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow("JWT_SECRET"),
        });
    }

    async validate(payload: AccessTokenPaylod) {
        return { userId: payload.sub };
    }
}
