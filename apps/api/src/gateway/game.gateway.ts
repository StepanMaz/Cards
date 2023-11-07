import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import type {
    GameServerEvents,
    GameClientEvents,
    ToSocketIOEvents,
} from "shared/src/types/sockets";
import { GameService } from "../services/game.service";
import type { Game } from "../game";

type OnEvents = ToSocketIOEvents<GameClientEvents>;
type EmitEvents = ToSocketIOEvents<GameServerEvents>;

@WebSocketGateway({ namespace: "game" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(GameGateway.name);

    @WebSocketServer()
    server: Server<OnEvents, EmitEvents>;

    constructor(private readonly gameService: GameService) {}

    async handleConnection(client: Socket<OnEvents, EmitEvents>) {
        this.logger.debug(`New game gateway connection id: ${client.id}`);

        const auth = client.handshake.auth;
        if (!isValidAuth(auth) || !this.gameService.has(auth.game_id)) {
            this.logger.debug(
                `Connection ${
                    client.id
                } rejected due to invalid params:\n\t${JSON.stringify(auth)}`,
            );
            client.disconnect();
            return;
        }

        const { game_id, token } = auth;

        const game: Game<string> = this.gameService.get(game_id);

        await client.join(game_id);
    }

    handleDisconnect(client: Socket<OnEvents, EmitEvents>) {
        client.to(client.data.game_id).emit("remove_player", { id: client.id });
    }
}

function isValidAuth(auth: any): auth is { token: string; game_id: string } {
    return (
        "game_id" in auth &&
        "token" in auth &&
        typeof auth.game_id === "string" &&
        typeof auth.token === "string"
    );
}
