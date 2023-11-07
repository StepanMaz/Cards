import { Injectable, Inject } from "@nestjs/common";
import { REDIS_CONNECTION } from "src/types&constants/constants";
import { Lobby } from "../types&constants/lobby";
import { RedisConnection } from "../types&constants/redis";

@Injectable()
export class LobbyRepository {
    constructor(
        @Inject(REDIS_CONNECTION)
        private readonly redis_client: RedisConnection,
    ) {}

    async create(id: string, lobby: Lobby) {
        await this.redis_client.json.set(
            this.getLobbyName(id),
            "$",
            JSON.stringify(lobby),
        );
    }

    get(id: string) {
        return this.redis_client.json.get(this.getLobbyName(id));
    }

    async exists(id: string) {
        return (await this.get(id)) != null;
    }

    private getLobbyName(id: string) {
        return `lobby-${id}`;
    }
}
