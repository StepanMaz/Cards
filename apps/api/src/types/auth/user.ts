import type { JwtStrategy } from "src/services/auth";

export type HttpContextUser = Awaited<ReturnType<JwtStrategy["validate"]>>;
